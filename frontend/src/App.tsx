import * as React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useLazyQuery, gql } from '@apollo/client';
import { UserContext } from './context';
import { ForgotPassword, Home, Login, ResetPassword, SignUp, Verify } from './routes';

const ME_QUERY = gql`
  query {
    me {
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
`;

export function App() {
  const [user, setUser] = React.useState(null);
  const [getMe] = useLazyQuery(ME_QUERY);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getMe()
        .then((meRes) => {
          console.log('Hit the .then()');
          if (meRes.data && meRes.data.me) {
            setUser(meRes.data.me);
          }
        })
        .catch(() => {
          console.log('Hit the .catch()');
        });
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Link to="/">
            <h1>Issue Tracker</h1>
          </Link>
          {!user && (
            <>
              <Link to="/login">
                <p>Login</p>
              </Link>
              <Link to="/signup">
                <p>Sign Up</p>
              </Link>
            </>
          )}
          {user && (
            <a
              onClick={() => {
                localStorage.removeItem('token');
                setUser(null);
              }}
            >
              Logout
            </a>
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password/:resetPasswordKey" element={<ResetPassword />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verify/:verificationKey" element={<Verify />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}
