import gql from 'graphql-tag';

export default gql`
mutation addMessage($chatId: ID, $content: String) {
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
