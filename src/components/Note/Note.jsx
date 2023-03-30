import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { useQuery, useMutation } from '@apollo/client';

import styles from './Note.module.scss';
import './draft.scss';
import { NOTE } from '../../graphql/query/queryNote';
import { UPDATED_NOTE } from '../../graphql/mutation/mutationNote';
import Loading from '../Loading';

const cx = classNames.bind(styles);

function Note() {
    const { noteId } = useParams();
    const { loading, error, data } = useQuery(NOTE, {
        variables: { noteId },
    });

    const [updatedNote] = useMutation(UPDATED_NOTE, {
        refetchQueries: [
            { query: NOTE }, // DocumentNode object parsed with gql
            'Note', // Query name
        ],
    });

    let noteItem = { id: 1, content: '' };
    if (data !== undefined) noteItem = data.note;

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [rawHtml, setRawHtml] = useState(noteItem?.content);

    useEffect(() => {
        const blocksFromHTML = convertFromHTML(noteItem?.content);
        const state = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
        setEditorState(EditorState.createWithContent(state));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noteItem?.id]);

    useEffect(() => {
        setRawHtml(noteItem?.content);
    }, [noteItem?.content]);

    const handleEditorStateChange = (e) => {
        setEditorState(e);
        setRawHtml(draftToHtml(convertToRaw(e.getCurrentContent())));
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (rawHtml === noteItem.content) return;

            updatedNote({
                variables: {
                    id: noteId,
                    content: rawHtml,
                },
            });
        }, 1000);

        return () => clearTimeout(debounce);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rawHtml]);

    if (loading || error) return <Loading />;
    return (
        <section className={cx('note')}>
            <Editor editorState={editorState} onEditorStateChange={handleEditorStateChange} placeholder="Note . . . " />
        </section>
    );
}

export default Note;
