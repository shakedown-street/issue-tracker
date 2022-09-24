import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import './Project.scss';

const PROJECT_QUERY = gql`
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

const CREATE_LABEL_MUTATION = gql`
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

export function Project() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(PROJECT_QUERY, {
    variables: {
      id,
    },
  });

  console.log(data);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!data) {
    return <></>;
  }

  const renderLabels = () => {
    const labels = data.project.labels;

    return labels.map((label: any) => (
      <div key={`label-${label.id}`} className="label" style={{ backgroundColor: label.color }}>
        {label.name}
      </div>
    ));
  };

  return (
    <>
      <h2>{data.project.name}</h2>
      <p>{data.project.description}</p>
      <p>Project Labels:</p>
      {renderLabels()}
      <button>Create Label</button>
    </>
  );
}
