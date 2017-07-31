import gql from 'graphql-tag';

import messageFragment from './fragment/message';

export default gql`
mutation createMessage($text: String!, $userId: Int!, $groupId: Int!) {
  createMessage(text: $text, userId: $userId, groupId: $groupId) {
    ...MessageFragment 
  }
}
${messageFragment}
`;
