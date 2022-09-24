import * as React from 'react';
import { Link } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';

const SEND_PASSWORD_RESET_MUTATION = gql`
  mutation sendPasswordResetEmail($email: String!) {
    sendPasswordResetEmail(email: $email) {
      success
    }
  }
`;

export function ForgotPassword() {
  const [email, setEmail] = React.useState<string>('');
  const [sendPasswordResetEmail, { data, loading, error }] = useMutation(SEND_PASSWORD_RESET_MUTATION);

  const onSubmit = (e: any) => {
    e.preventDefault();
    sendPasswordResetEmail({
      variables: {
        email,
      },
    }).then(() => {
      // Show please check your email for password reset link
    });
  };

  return (
    <>
      <h2>Forgot Password</h2>
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
        {error && <p>{error.message}</p>}
        {!loading && <button type="submit">Reset Password</button>}
      </form>
    </>
  );
}
