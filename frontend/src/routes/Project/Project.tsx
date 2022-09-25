import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import { CREATE_LABEL_MUTATION } from '../../mutations';
import { PROJECT_QUERY } from '../../queries';
import './Project.scss';

export function Project() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(PROJECT_QUERY, {
    variables: {
      id,
    },
  });

  console.log(data);

  const renderLabels = () => {
    const labels = data.project.labels;

    return labels.map((label: any) => (
      <div key={`label-${label.id}`} className="label" style={{ backgroundColor: label.color }}>
        {label.name}
      </div>
    ));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!data) {
    return <></>;
  }

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
