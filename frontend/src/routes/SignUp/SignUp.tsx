import * as React from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from '../../mutations';

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
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={onSubmit}>
        <p>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="input"
            readOnly={loading}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </p>
        <p>
          <label htmlFor="password1">Password</label>
          <input
            id="password1"
            type="password"
            className="input"
            readOnly={loading}
            value={password1}
            onChange={(e) => {
              setPassword1(e.target.value);
            }}
          />
        </p>
        <p>
          <label htmlFor="password2">Password (Again)</label>
          <input
            id="password2"
            type="password"
            className="input"
            readOnly={loading}
            value={password2}
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
          />
        </p>
        {error && <p>{error.message}</p>}
        <p>
          <button type="submit" className="button" disabled={loading}>
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}
