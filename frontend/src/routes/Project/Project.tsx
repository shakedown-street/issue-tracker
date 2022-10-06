import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { PROJECT_QUERY } from '../../queries';
import './Project.scss';

export function Project() {
  const { projectId } = useParams();
  const {
    data: projectData,
    loading: projectLoading,
    error: projectError,
  } = useQuery(PROJECT_QUERY, {
    variables: {
      id: projectId,
    },
  });

  console.log(projectData);

  if (projectLoading) {
    return <p>Loading...</p>;
  }

  if (projectError) {
    return <p>{projectError.message}</p>;
  }

  if (!projectData) {
    return <></>;
  }

  return (
    <div className="container">
      <h2>{projectData.project.name}</h2>
      <p>{projectData.project.description}</p>
      <label>Owner:</label>
      <p>
        {projectData.project.owner.firstName} {projectData.project.owner.lastName}
      </p>
      <label>Members:</label>
      <ul>
        {projectData.project.members.edges.map((member: any) => (
          <li key={member.node.id}>
            {member.node.firstName} {member.node.lastName}
          </li>
        ))}
      </ul>
      <Link to={`/${projectId}/issues`}>Issues</Link>
      <Link to={`/${projectId}/issues/new`}>
        <button className="button">Create Issue</button>
      </Link>
    </div>
  );
}
