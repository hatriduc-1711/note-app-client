import { gql } from '@apollo/client';

export const NOTE_LIST = gql`
    query GetFolderList {
        folders {
            id
            name
        }
    }
`;

export const NOTE = gql`
    query Note($noteId: ID) {
        note(noteId: $noteId) {
            content
            id
        }
    }
`;
