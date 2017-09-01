import { gql } from 'react-apollo';

export const ChatMembers =  gql`
query getMembers($id: ID){
  chat(id: $id) {
    id
    name
    members{
      access
      user{
        id
        username
      }
    }   
  }
}
`;

export const ChatMessages = gql`
query getMessages($id: ID) {
  chat(id: $id) {
    id
    name
    messages {
      id
      user {
        id
        username
      }
      content
      createdAt
    }
  }
}
`;

export const Chats = gql`
{
  chats {
    id
    name
  }
}
`;
