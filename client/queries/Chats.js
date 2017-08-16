import gql from 'graphql-tag';

export default gql`
{
  chats {
    id
    name
  }
}
`;