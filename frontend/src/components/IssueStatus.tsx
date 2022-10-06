import * as React from 'react';

interface IssueStatusProps {
  issue: any;
}

export function IssueStatus(props: IssueStatusProps) {
  if (!props.issue) {
    return <></>;
  }

  let label = 'Open';
  let color = 'green';

  if (props.issue.closedAt) {
    label = 'Closed';
    color = 'red';
  }

  return (
    <div className="badge" style={{ backgroundColor: color }}>
      {label}
    </div>
  );
}
