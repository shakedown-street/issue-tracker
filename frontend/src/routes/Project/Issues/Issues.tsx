import * as React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useQuery } from '@apollo/client';
import { IssueStatus } from '../../../components';
import { PROJECT_ISSUES_QUERY } from '../../../queries';

export function Issues() {
  const { projectId } = useParams();
  const { data, loading, error } = useQuery(PROJECT_ISSUES_QUERY, {
    variables: {
      project: projectId,
    },
  });

  const renderIssues = () => {
    return data.issues.edges.map((issue: any) => (
      <tr>
        <td>
          <Link key={issue.node.id} to={`/${projectId}/issues/${issue.node.id}`}>
            {issue.node.title}
          </Link>
          <p>
            Created by{' '}
            <span>
              {issue.node.createdBy.firstName} {issue.node.createdBy.lastName}
            </span>{' '}
            on {format(new Date(issue.node.createdAt), 'MMM d, yyyy')}
          </p>
        </td>
        <td>
          <IssueStatus issue={issue.node} />
        </td>
        <td>
          <img src={`http://localhost:8000/media/${issue.node.assignee?.image}`} style={{ width: '32px' }} />
        </td>
      </tr>
    ));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h2>Issues</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Assignee</th>
          </tr>
        </thead>
        <tbody>{renderIssues()}</tbody>
      </table>
    </div>
  );
}
