import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { BsFileEarmarkMedical } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import { useQuery, useMutation } from '@apollo/client';

import styles from './NotesList.module.scss';
import Loading from '../Loading';
import Empty from '../Empty';
import { FOLDER } from '../../graphql/query/queryFolder';
import { ADD_NOTE, DELETE_NOTE } from '../../graphql/mutation/mutationNote';

const cx = classNames.bind(styles);

function NotesList() {
    const navigate = useNavigate();
    const { noteId, folderId } = useParams();
    const { loading, error, data } = useQuery(FOLDER, {
        variables: { folderId },
    });

    const [addNote] = useMutation(ADD_NOTE, {
        refetchQueries: [
            { query: FOLDER }, // DocumentNode object parsed with gql
            'Folder', // Query name
        ],
    });

    const [deleteNote] = useMutation(DELETE_NOTE, {
        refetchQueries: [
            { query: FOLDER }, // DocumentNode object parsed with gql
            'Folder', // Query name
        ],
    });

    useEffect(() => {
        if (!loading && !error && data !== undefined && data.folder.notes.length > 0) {
            navigate(`/folders/${folderId}/notes/${data.folder.notes[0].id}`);
        }
        if (!loading && !error && data !== undefined && data.folder.notes.length === 0) {
            navigate(`/folders/${folderId}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, error, data]);

    const handleAddNote = () => {
        addNote({
            variables: { folderId },
        });
    };

    const handleDeleteNote = (id) => {
        deleteNote({
            variables: {
                id: id,
            },
        });
    };

    return (
        <>
            {loading || error ? (
                <Loading />
            ) : (
                <section className={cx('notes-container')}>
                    <section className={cx('notes-list-container')}>
                        <div className={cx('notes-header')}>
                            <h3 className={cx('notes-title')}>Notes</h3>
                            <Tippy content="Add Note" placement="left" theme="light">
                                <div onClick={handleAddNote} className={cx('button-add-note')}>
                                    <BsFileEarmarkMedical />
                                </div>
                            </Tippy>
                        </div>
                        <ul className={cx('notes-list')}>
                            {data.folder.notes.map(({ id, content }) => (
                                <li key={id} className={cx('notes-item', { 'active-note': id === noteId })}>
                                    <Link to={`notes/${id}`}>
                                        {' '}
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: `${content.substring(0, 30) || 'Empty'}`,
                                            }}
                                        ></div>
                                    </Link>
                                    <button onClick={() => handleDeleteNote(id)} className={cx('delete-note')}>
                                        <FaTrash />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </section>
                    {data !== undefined && data.folder.notes.length === 0 ? <Empty /> : <Outlet />}
                </section>
            )}
        </>
    );
}

export default NotesList;
