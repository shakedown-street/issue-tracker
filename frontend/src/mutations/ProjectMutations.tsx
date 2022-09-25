import { gql } from '@apollo/client';

export const CREATE_PROJECT_MUTATION = gql`
  mutation createProject($name: String!, $description: String, $website: String) {
    createProject(name: $name, description: $description, website: $website) {
      project {
        id
        createdAt
        modifiedAt
        name
        description
        website
        owner {
          id
        }
        members {
          id
        }
      }
    }
  }
`;
