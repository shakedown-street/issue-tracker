import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT_MUTATION } from '../../mutations';

export function CreateProject() {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [website, setWebsite] = React.useState('');
  const [createProject] = useMutation(CREATE_PROJECT_MUTATION);
  const navigate = useNavigate();

  const onSubmit = (e: any) => {
    e.preventDefault();
    createProject({
      variables: {
        name,
        description,
        website,
      },
    }).then((createProjectRes) => {
      navigate(`/${createProjectRes.data.createProject.project.id}`);
    });
  };

  return (
    <div className="container">
      <h2>Create Project</h2>
      <form onSubmit={onSubmit}>
        <p>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            className="input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="input"
            rows={4}
            cols={80}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </p>
        <p>
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="url"
            className="input"
            value={website}
            onChange={(e) => {
              setWebsite(e.target.value);
            }}
          />
        </p>
        <p>
          <button type="submit" className="button">
            Create Project
          </button>
        </p>
      </form>
    </div>
  );
}
