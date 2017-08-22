import gql from 'graphql-tag';

export default gql`
{
  subscription{
    messageAdded {
      id
      content
      createdAt
      user{
        id
        username
      }
    }
  }
}
`;