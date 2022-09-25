import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation createUser($email: String!, $password1: String!, $password2: String!) {
    createUser(email: $email, password1: $password1, password2: $password2) {
      success
    }
  }
`;

export const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($verificationKey: String!) {
    verifyEmail(verificationKey: $verificationKey) {
      success
    }
  }
`;

export const SEND_PASSWORD_RESET_MUTATION = gql`
  mutation sendPasswordResetEmail($email: String!) {
    sendPasswordResetEmail(email: $email) {
      success
    }
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword($resetPasswordKey: String!, $password1: String!, $password2: String!) {
    resetPassword(resetPasswordKey: $resetPasswordKey, password1: $password1, password2: $password2) {
      success
    }
  }
`;

export const TOKEN_AUTH_MUTATION = gql`
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
