import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query {
    me {
      id
      email
      firstName
      lastName
      image
      isStaff
      isSuperuser
      isDeveloper
      isActive
      dateJoined
      lastLogin
    }
  }
`;
