import gql from 'graphql-tag';

export default gql`
  query user($id: Int) {
    user(id: $id) {
      id
      email
      username
      groups {
        id
        name
      }
    }
  }
`;
