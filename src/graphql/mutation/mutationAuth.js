import { gql } from '@apollo/client';

export const REGISTER = gql`
    mutation Register($uid: ID, $name: String) {
        register(uid: $uid, name: $name) {
            name
            uid
        }
    }
`;
