import {gql} from 'react-apollo';

export default gql`
{
  chats {
    id
    name
  }
}
`;