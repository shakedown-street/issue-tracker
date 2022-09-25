import { gql } from '@apollo/client';

export const CREATE_LABEL_MUTATION = gql`
  mutation createLabel($projectId: ID!, $name: String!, $color: String) {
    createLabel(projectId: $projectId, name: $name, color: $color) {
      label {
        id
        createdAt
        modifiedAt
        project {
          id
        }
        name
        color
      }
    }
  }
`;
