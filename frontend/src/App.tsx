import * as React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { UserContext } from './context';
import {
  CreateIssue,
  CreateProject,
  ForgotPassword,
  Home,
  Issue,
  Issues,
  Login,
  Project,
  ResetPassword,
  SignUp,
  Verify,
} from './routes';
import { ME_QUERY } from './queries';
import './App.scss';
import { Button } from './components';

export function App() {
  const client = useApolloClient();
  const token = localStorage.getItem('token');
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    if (token) {
      client
        .query({
          query: ME_QUERY,
        })
        .then((meRes) => {
          if (meRes.data && meRes.data.me) {
            setUser(meRes.data.me);
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.replace('/login');
  };

  if (token && !user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <div className="nav">
            <div className="container nav__content">
              <Link to="/">
                <h1 className="nav__title">Issue Tracker</h1>
              </Link>
              <div className="nav__spacer"></div>
              {!user && (
                <>
                  <Link to="/login" className="nav__link">
                    <Button>Login</Button>
                  </Link>
                  <Link to="/signup" className="nav__link">
                    <Button>Sign Up</Button>
                  </Link>
                </>
              )}
              {user && (
                <a
                  className="nav__link"
                  onClick={() => {
                    logout();
                  }}
                >
                  <button className="button">Logout</button>
                </a>
              )}
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verify/:verificationKey" element={<Verify />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:resetPasswordKey" element={<ResetPassword />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/:projectId" element={<Project />} />
            <Route path="/:projectId/issues" element={<Issues />} />
            <Route path="/:projectId/issues/:issueId" element={<Issue />} />
            <Route path="/:projectId/issues/new" element={<CreateIssue />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}
