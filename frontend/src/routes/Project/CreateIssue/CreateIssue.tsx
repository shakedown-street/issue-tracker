import * as React from 'react';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Button } from '../../../components';
import { CREATE_ISSUE_MUTATION } from '../../../queries';

export function CreateIssue() {
  const { projectId } = useParams();
  const [createIssue] = useMutation(CREATE_ISSUE_MUTATION);

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [dueDate, setDueDate] = React.useState<Date | null>(null);
  const [assigneeId, setAssigneeId] = React.useState(null);
  const [labelIds, setLabelIds] = React.useState([]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createIssue({
      variables: {
        projectId,
        title,
        description,
        dueDate,
        assigneeId,
        labelIds,
      },
    }).then(() => {
      console.log('better not');
    });
  };

  return (
    <div className="container">
      <h2>Create Issue</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            className="input"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="input"
            rows={8}
            cols={80}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </p>
        <Button type="submit">Create Issue</Button>
      </form>
    </div>
  );
}
