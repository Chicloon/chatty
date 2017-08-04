import gql from 'graphql-tag';

export default gql`
  query group($groupId: Int!) {
    group(id: $groupId) {
      id
      name
      users {
        id
        username
      }
      messages {
        id
        from {
          id
          username
        }
        createdAt
        text
      }
    }
  }
`;