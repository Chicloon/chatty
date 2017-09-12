import { gql } from 'react-apollo';

export const userFragment = gql`
fragment userFields on User {
  id
  username  
}
`;


export const Signup = gql`
  mutation Signup ($username: String!, $password: String!, $isAdmin: Boolean) {
    signup(username: $username, password: $password, isAdmin: $isAdmin){
  ...userFields
    }
  }
${userFragment}
`;

export const Login = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password){
    ...userFields
  }
}
${userFragment}
`;

export const Logout = gql`
  mutation {
    logout {
      ...userFields
    }
  }
${userFragment}  
`;
