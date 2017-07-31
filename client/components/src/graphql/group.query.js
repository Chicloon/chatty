import gql from 'graphql-tag';

import messageFragment from './message.fragment';

export default gql`
  query group($groupId: Int!) {
    group(id: $groupId) {
      id
      name
      users {
        id
        username
      }
      messages {
        ...MessageFragment
      }
    }
  }
  ${messageFragment}
`;