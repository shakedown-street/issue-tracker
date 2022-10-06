import { gql } from '@apollo/client';

export const CREATE_ISSUE_MUTATION = gql`
  mutation createIssue(
    $projectId: ID!
    $title: String!
    $description: String
    $dueDate: Date
    $assigneeId: ID
    $labelIds: [ID]
  ) {
    createIssue(
      projectId: $projectId
      title: $title
      description: $description
      dueDate: $dueDate
      assigneeId: $assigneeId
      labelIds: $labelIds
    ) {
      issue {
        id
        pk
      }
    }
  }
`;

export const PROJECT_ISSUES_QUERY = gql`
  query issues($project: ID) {
    issues(project: $project) {
      edges {
        node {
          id
          pk
          createdAt
          modifiedAt
          title
          closedAt
          createdBy {
            id
            pk
            email
            firstName
            lastName
          }
          assignee {
            id
            pk
            email
            firstName
            lastName
            image
          }
        }
      }
    }
  }
`;

export const ISSUE_QUERY = gql`
  query issue($id: ID!) {
    issue(id: $id) {
      id
      pk
      createdAt
      modifiedAt
      title
      description
      dueDate
      closedAt
      createdBy {
        id
        pk
        firstName
        lastName
      }
      assignee {
        id
        pk
        firstName
        lastName
      }
      closedBy {
        id
        pk
        firstName
        lastName
      }
      labels {
        edges {
          node {
            id
            pk
            name
            color
          }
        }
      }
    }
  }
`;

export const CLOSE_ISSUE_MUTATION = gql`
  mutation closeIssue($issueId: ID!) {
    closeIssue(issueId: $issueId) {
      issue {
        closedAt
        closedBy {
          id
          pk
          firstName
          lastName
        }
      }
    }
  }
`;
