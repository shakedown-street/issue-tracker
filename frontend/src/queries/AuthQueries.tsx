import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query {
    me {
      id
      pk
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

export const USERS_QUERY = gql`
  query {
    users {
      edges {
        node {
          id
          pk
          email
          firstName
          lastName
          image
          isActive
          dateJoined
          lastLogin
        }
      }
    }
  }
`;
