import {gql} from 'react-apollo';

export default gql`
query getChatName($id: ID) {
  chat(id: $id) {
    id
    name
  }
}
`;