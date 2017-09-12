import {gql} from 'react-apollo';

export const SendMessage = gql`
mutation addMessage($chatId: ID!, $content: String) {
  addMessage(chatId: $chatId, content: $content) {
    id
    content
    createdAt
    user{
      id
      username
    }    
  }
}
`;
