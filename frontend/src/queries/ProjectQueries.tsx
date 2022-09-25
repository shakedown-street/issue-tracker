import { gql } from '@apollo/client';

export const PROJECT_QUERY = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      createdAt
      modifiedAt
      name
      description
      website
      labels {
        id
        createdAt
        modifiedAt
        name
        color
      }
      owner {
        id
        email
        firstName
        lastName
        image
        dateJoined
      }
      members {
        id
        email
        firstName
        lastName
        image
        dateJoined
      }
    }
  }
`;
