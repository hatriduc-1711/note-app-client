import { gql } from '@apollo/client';

export const FOLDER_LIST = gql`
    query GetFolderList {
        folders {
            id
            name
            notes {
                id
                content
            }
        }
    }
`;

export const FOLDER = gql`
    query Folder($folderId: ID!) {
        folder(folderId: $folderId) {
            notes {
                content
                id
            }
        }
    }
`;
