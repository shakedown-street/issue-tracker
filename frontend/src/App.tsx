import * as React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { UserContext } from './context';
import { CreateProject, ForgotPassword, Home, Login, Project, ResetPassword, SignUp, Verify } from './routes';
import { ME_QUERY } from './queries';
import './App.scss';

export function App() {
  const [user, setUser] = React.useState(null);
  const [getMe] = useLazyQuery(ME_QUERY);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getMe()
        .then((meRes) => {
          if (meRes.error) {
            localStorage.removeItem('token');
            setUser(null);
          }
          if (meRes.data && meRes.data.me) {
            setUser(meRes.data.me);
          }
        })
        .catch(() => {});
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
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/reset-password/:resetPasswordKey" element={<ResetPassword />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verify/:verificationKey" element={<Verify />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}
