import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "./authentication/AuthComponent";
import './root.css'

import {
  Link,
  useParams,
  useSearchParams,
  useRouteError,
  useLocation,
} from "react-router-dom";

export function Root(props) {
  const location = useLocation(); // Get the current page location
  const { children } = props;
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    window.location.href = '/ ';
  }

  // Determine if the navigation should have the specific style
  const isPetPage = location.pathname === "/pet"; 

  return (
    <>
      <nav className={`nav ${isPetPage ? 'nav-pet' : ''}`}>
        <ul>
          <li>
            <NavLink to="/" className="nav-link">Home</NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink to="/quiz" className="nav-link">Quiz</NavLink>
              </li>
              <li>
                <NavLink to="/explore" className="nav-link">Explore</NavLink>
              </li>
              <li>
                <NavLink to="/pet">Pet</NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink to="/howto">How To</NavLink>
          </li>
        </ul>
        {user && (
          <div className="logout-container">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </nav>
      <main>{children || <Outlet />}</main>
    </>
  );
}

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <>
      <h1>Error 404</h1>
      <p>{error.statusText || error.message}</p>
    </>
  );
}
