import {gql} from 'react-apollo';

export default gql`
  mutation Signup ($username: String!, $password: String!) {
    signup(username: $username, password: $password){
      id
      username
    }
  }
`;