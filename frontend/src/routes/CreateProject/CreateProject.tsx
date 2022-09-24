import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';

const CREATE_PROJECT_MUTATION = gql`
  mutation createProject($name: String!, $description: String, $website: String) {
    createProject(name: $name, description: $description, website: $website) {
      project {
        id
        createdAt
        modifiedAt
        name
        description
        website
        owner {
          id
        }
        members {
          id
        }
      }
    }
  }
`;

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
      navigate(`/project/${createProjectRes.data.createProject.project.id}`);
    });
  };

  return (
    <>
      <h2>Create Project</h2>
      <form onSubmit={onSubmit}>
        <p>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
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
            value={website}
            onChange={(e) => {
              setWebsite(e.target.value);
            }}
          />
        </p>
        <p>
          <button type="submit">Create Project</button>
        </p>
      </form>
    </>
  );
}
