import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { VERIFY_EMAIL_MUTATION } from '../../mutations';

export function Verify() {
  const { verificationKey } = useParams();
  const [verifyEmail, { data, loading, error }] = useMutation(VERIFY_EMAIL_MUTATION);

  React.useEffect(() => {
    verifyEmail({
      variables: {
        verificationKey,
      },
    });
  }, [verificationKey]);

  return (
    <>
      <h2>Verify</h2>
      {error && <p>{error.message}</p>}
      {data && (
        <>
          <p>Your email address has been verified</p>
          <p>
            You may now <Link to="/login">login</Link>
          </p>
        </>
      )}
    </>
  );
}
