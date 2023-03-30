import { gql } from '@apollo/client';

export const ADD_NOTE = gql`
    mutation AddNote($folderId: ID!) {
        addNote(folderId: $folderId) {
            id
            content
        }
    }
`;

export const UPDATED_NOTE = gql`
    mutation updatedNote($id: ID!, $content: String) {
        updatedNote(id: $id, content: $content) {
            content
            id
        }
    }
`;

export const DELETE_NOTE = gql`
    mutation deleteNote($id: ID!) {
        deleteNote(id: $id) {
            id
        }
    }
`;
