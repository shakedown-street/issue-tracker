import * as React from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_USER_MUTATION = gql`
  mutation createUser($email: String!, $password1: String!, $password2: String!) {
    createUser(email: $email, password1: $password1, password2: $password2) {
      success
    }
  }
`;

export function SignUp() {
  const [email, setEmail] = React.useState<string>('');
  const [password1, setPassword1] = React.useState<string>('');
  const [password2, setPassword2] = React.useState<string>('');
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER_MUTATION);

  const onSubmit = (e: any) => {
    e.preventDefault();
    createUser({
      variables: {
        email,
        password1,
        password2,
      },
    }).then(() => {
      // Show please verify your email
      console.log('this should not be hit');
    });
  };

  return (
    <>
      <h2>Sign Up</h2>
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
        <label htmlFor="password1">Password</label>
        <input
          id="password1"
          type="password"
          readOnly={loading}
          value={password1}
          onChange={(e) => {
            setPassword1(e.target.value);
          }}
        />
        <label htmlFor="password2">Password (Again)</label>
        <input
          id="password2"
          type="password"
          readOnly={loading}
          value={password2}
          onChange={(e) => {
            setPassword2(e.target.value);
          }}
        />
        {error && <p>{error.message}</p>}
        {!loading && <button type="submit">Sign Up</button>}
      </form>
    </>
  );
}
