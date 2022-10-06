import * as React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import { Button } from '../../components';
import { UserContext } from '../../context';
import { PROJECTS_QUERY } from '../../queries';

export function Home() {
  const { user } = React.useContext(UserContext);

  return (
    <div className="container">
      <h2>Home</h2>

      {!user && <p>You are not logged in</p>}

      {user && (
        <>
          <div key={user.id}>
            <h4>{user.email}</h4>
            {user.image && <img src={`http://localhost:8000/media/${user.image}`} />}
            <p>
              {user.firstName} {user.lastName}
            </p>
          </div>
          <MyProjects />
        </>
      )}
    </div>
  );
}

function MyProjects() {
  const { data, loading, error } = useQuery(PROJECTS_QUERY);

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
      <h3>Projects</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Created At</th>
            <th>Members</th>
            <th>Issues</th>
          </tr>
        </thead>
        <tbody>
          {data.projects.edges.map((project: any) => (
            <tr key={`project-${project.node.id}`}>
              <td>
                <Link to={`/${project.node.id}`}>{project.node.name}</Link>
              </td>
              <td>{format(new Date(project.node.createdAt), 'MMM dd, yyyy')}</td>
              <td>0</td>
              <td>0</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/create-project">
        <Button>Create Project</Button>
      </Link>
    </>
  );
}
