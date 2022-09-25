import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { RESET_PASSWORD_MUTATION } from '../../mutations';

export function ResetPassword() {
  const { resetPasswordKey } = useParams();
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [resetPassword, { data, loading, error }] = useMutation(RESET_PASSWORD_MUTATION);
  const navigate = useNavigate();

  const onSubmit = (e: any) => {
    e.preventDefault();
    resetPassword({
      variables: {
        resetPasswordKey,
        password1,
        password2,
      },
    }).then(() => {
      navigate('/login');
      // show message that password was reset successfully
    });
  };

  return (
    <>
      <h2>Reset Password</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="password1">New Password</label>
        <input
          id="password1"
          type="password"
          readOnly={loading}
          value={password1}
          onChange={(e) => {
            setPassword1(e.target.value);
          }}
        />
        <label htmlFor="password2">New Password (Again)</label>
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
        {!loading && <button type="submit">Reset Password</button>}
      </form>
    </>
  );
}
