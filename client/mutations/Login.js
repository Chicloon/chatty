import {gql} from 'react-apollo';

export default gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password){
      id
      username
  }
}
`;