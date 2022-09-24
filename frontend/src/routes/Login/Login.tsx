import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { UserContext } from '../../context';

const TOKEN_AUTH_MUTATION = gql`
  mutation tokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
      user {
        id
        email
        firstName
        lastName
        image
        isStaff
        isSuperuser
        isDeveloper
        isActive
        dateJoined
        lastLogin
      }
    }
  }
`;

export function Login() {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [login, { data, loading, error }] = useMutation(TOKEN_AUTH_MUTATION);
  const { setUser } = React.useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = (e: any) => {
    e.preventDefault();
    login({
      variables: {
        email,
        password,
      },
    }).then((loginRes: any) => {
      localStorage.setItem('token', loginRes.data.tokenAuth.token);
      setUser(loginRes.data.tokenAuth.user);
      navigate('/');
    });
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          readOnly={loading}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          readOnly={loading}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {error && <p>{error.message}</p>}
        {!loading && <button type="submit">Login</button>}
        <Link to="/forgot-password">Forgot Password</Link>
      </form>
    </>
  );
}
