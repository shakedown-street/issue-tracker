import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { UserContext } from '../../context';
import { TOKEN_AUTH_MUTATION } from '../../mutations';
import './Login.scss';

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
    <div className="container login">
      <form className="login__form" onSubmit={onSubmit}>
        <h2>Login</h2>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="input login__form__input"
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
          className="input login__form__input"
          readOnly={loading}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {error && <p className="login__form__error">{error.message}</p>}
        <button className="button login__form__button" disabled={loading} type="submit">
          Login
        </button>
        <Link to="/forgot-password">Forgot Password</Link>
        <Link to="/forgot-password">Resend Verification</Link>
      </form>
    </div>
  );
}
