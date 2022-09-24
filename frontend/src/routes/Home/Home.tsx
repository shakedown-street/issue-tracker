import * as React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context';

export function Home() {
  const { user } = React.useContext(UserContext);

  return (
    <>
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
          <Link to="/create-project">
            <button>Create Project</button>
          </Link>
        </>
      )}
    </>
  );
}
