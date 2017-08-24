import {gql} from 'react-apollo';

export default gql`
{
  subscription{
    messageAdded {
      id
      content
      createdAt   
    }
  }
}
`;