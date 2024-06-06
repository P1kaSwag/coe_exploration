import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "./authentication/AuthComponent";
import { useLocation } from "react-router-dom";
import pet_head_grad from "./assets/pet_head_grad.png";
import './root.css'; // Ensure this is imported for styles

export function Root(props) {
  const location = useLocation();
  const { children } = props;
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    window.location.href = '/';
  }

  const isPetPage = location.pathname === "/pet"; 

  return (
    <>
      <nav className={`nav ${isPetPage ? 'nav-pet' : ''}`}>
        <ul className="nav-list">
          <li className="nav-item logo-item">
            <img src={pet_head_grad} alt="Pet Head" className="pet-head" />
          </li>
          <li className="nav-item">
            <NavLink to="/" className="nav-link">Home</NavLink>
          </li>
          {user && (
            <>
              <li className="nav-item">
                <NavLink to="/quiz" className="nav-link">Quiz</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/explore" className="nav-link">Explore</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/pet" className="nav-link">Pet</NavLink>
              </li>
            </>
          )}
          <li className="nav-item">
            <NavLink to="/howto" className="nav-link">How To</NavLink>
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
