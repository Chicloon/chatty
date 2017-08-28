import {gql} from 'react-apollo';

export default gql`
query getMessages($id: ID!) {
  messages(chatId: $id) {
    id
    user {
      id
      username
    }
    content
    createdAt
  }
}
`;