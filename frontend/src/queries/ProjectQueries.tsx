import { gql } from '@apollo/client';

export const PROJECTS_QUERY = gql`
  query {
    projects {
      edges {
        node {
          id
          pk
          createdAt
          name
        }
      }
    }
  }
`;

export const PROJECT_QUERY = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      createdAt
      modifiedAt
      name
      description
      website
      owner {
        id
        pk
        email
        firstName
        lastName
        image
        dateJoined
      }
      members {
        edges {
          node {
            id
            pk
            email
            firstName
            lastName
            image
            dateJoined
          }
        }
      }
    }
  }
`;
