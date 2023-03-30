import { gql } from '@apollo/client';

export const ADD_FOLDER = gql`
    mutation AddFolder($name: String!) {
        addFolder(name: $name) {
            id
        }
    }
`;

export const DELETE_FOLDER = gql`
    mutation DeleteFolder($id: ID!) {
        deleteFolder(id: $id) {
            id
        }
    }
`;
