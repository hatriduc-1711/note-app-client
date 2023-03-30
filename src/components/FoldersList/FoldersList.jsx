import classNames from 'classnames/bind';
import { useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link, useParams } from 'react-router-dom';
import { CgFolderAdd } from 'react-icons/cg';
import { useMutation } from '@apollo/client';
import { ADD_FOLDER, DELETE_FOLDER } from '../../graphql/mutation/mutationFolder';
import { FOLDER_LIST } from '../../graphql/query/queryFolder';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

import styles from './FoldersList.module.scss';

const cx = classNames.bind(styles);

function FoldersList({ folders }) {
    const [addFolder] = useMutation(ADD_FOLDER, {
        refetchQueries: [
            { query: FOLDER_LIST }, // DocumentNode object parsed with gql
            'GetFolderList', // Query name
        ],
    });
    const [deleteFolder] = useMutation(DELETE_FOLDER, {
        refetchQueries: [
            { query: FOLDER_LIST }, // DocumentNode object parsed with gql
            'GetFolderList', // Query name
        ],
    });
    const [input, setInput] = useState('');
    const [open, setOpen] = useState(false);
    const { folderId } = useParams();

    const handleAddFolder = () => {
        if (input) {
            addFolder({
                variables: {
                    name: input,
                },
            });
            setInput('');
        }
        setOpen(false);
    };

    const handleDeleteFolder = (id) => {
        deleteFolder({
            variables: {
                id: id,
            },
        });
    };

    return (
        <>
            {open && (
                <section className={cx('modal-add-folder')}>
                    <div className={cx('form-add-folder')}>
                        <h4>Add Folder</h4>
                        <input
                            value={input}
                            type="text"
                            placeholder="New Folder"
                            onChange={(e) => setInput(e.target.value)}
                            spellCheck={false}
                        />
                        <div className={cx('group-btn')}>
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    setInput('');
                                }}
                            >
                                Cancel
                            </button>
                            <button onClick={handleAddFolder}>Add</button>
                        </div>
                    </div>
                </section>
            )}
            <section className={cx('folders-container')}>
                <div className={cx('folders-header')}>
                    <h3 className={cx('folders-title')}>Folders</h3>
                    <Tippy content="Add Folder" placement="left">
                        <div onClick={() => setOpen(true)} className={cx('button-add-folder')}>
                            <CgFolderAdd />
                        </div>
                    </Tippy>
                </div>
                <ul className={cx('folders-list')}>
                    {folders?.map(({ id, name }) => (
                        <li key={id} className={cx('folders-item', { 'active-folder': id === folderId })}>
                            <Link to={`folders/${id}`}>
                                {' '}
                                <div>{name}</div>
                            </Link>
                            <div className={cx('btn-option-folder')}>
                                <button className={cx('btn-update')}>
                                    <FaPencilAlt />
                                </button>
                                <button onClick={() => handleDeleteFolder(id)} className={cx('btn-delete')}>
                                    <FaTrash />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

export default FoldersList;
