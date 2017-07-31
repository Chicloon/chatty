import gql from 'graphql-tag';

export default  gql`
  fragment MessageFragment on Message {
    id
    to {
      id
    }
    from {
      id
      username
    }
    createdAt
    text
  }
`;
