import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($verificationKey: String!) {
    verifyEmail(verificationKey: $verificationKey) {
      success
    }
  }
`;

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
