import { gql } from 'react-apollo';

export const CreateChat = gql`
mutation createChat($chatName:String) {
  createChat(name: $chatName) {
    id
    name
  }
}
`