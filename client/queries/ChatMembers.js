import {gql} from 'react-apollo';

export default gql`
query getMembers($id: ID){
  chat(id: $id) {
    id
    name
    members{
      access
      user{
        id
        username
      }
    }   
  }
}

`;