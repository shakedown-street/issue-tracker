import * as React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useMutation, useQuery } from '@apollo/client';
import { Button, IssueStatus } from '../../../components';
import { CLOSE_ISSUE_MUTATION, ISSUE_QUERY } from '../../../queries';
import './Issue.scss';

export function Issue() {
  const { projectId, issueId } = useParams();
  const { data, loading, error } = useQuery(ISSUE_QUERY, {
    variables: {
      id: issueId,
    },
  });
  const [closeIssue] = useMutation(CLOSE_ISSUE_MUTATION);

  const renderLabels = () => {
    let labels = data.issue.labels;
    return (
      <div>
        {labels.edges.map(({ node }: any) => (
          <div
            className="badge"
            style={{
              backgroundColor: node.color,
            }}
          >
            {node.name}
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h2>{data.issue.title}</h2>
      <p>
        <IssueStatus issue={data.issue} />{' '}
        <span>
          {data.issue.createdBy.firstName} {data.issue.createdBy.lastName}
        </span>{' '}
        created this issue on {format(new Date(data.issue.createdAt), 'MMM d, yyyy')}
      </p>
      <div className="card">
        <p>{data.issue.description}</p>
      </div>
      <label>Assignee</label>
      <p>
        {data.issue.assignee.firstName} {data.issue.assignee.lastName}
      </p>
      <label>Labels</label>
      {renderLabels()}
      <Button
        onClick={() => {
          closeIssue({
            variables: {
              issueId: data.issue.pk,
            },
          })
            .then((closeIssueRes) => {
              data.issue.closedAt = closeIssueRes.data.issue.closedAt;
              data.issue.closedBy = closeIssueRes.data.issue.closedBy;
            })
            .catch(() => {
              console.log('is this a catch?');
            });
        }}
      >
        Close Issue
      </Button>
    </div>
  );
}
