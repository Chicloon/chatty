import gql from 'graphql-tag';

export default gql`
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