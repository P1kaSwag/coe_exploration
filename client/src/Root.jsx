import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import './assets/root.css'

export function Root(props) {
  const { children } = props;
  return (
    <>
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/quiz" className="nav-link">
              Quiz
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore" className="nav-link">
              Explore
            </NavLink>
          </li>
        </ul>
        <div className="logout-container">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <main>{children || <Outlet />}</main>
      <Footer/>
    </>
  );
}

function handleLogout() {
  // Add logout functionality here
}

function Footer() {
  return (
    <footer style={{ backgroundColor: 'lightgray', padding: '20px', textAlign: 'center' }}>
      <div>Contact Us:</div>
      <div>Email: contact@example.com</div>
      <div>Phone: 123-456-7890</div>
      <div>
        Follow Us:
        <a href="https://www.facebook.com/example" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://www.twitter.com/example" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://www.instagram.com/example" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
      <div>&copy; 2024 CoE Exploration app. All rights reserved.</div>
    </footer>
  );
}

export function ErrorPage() {
  const error = useRouteError(); // Assuming you're using React Router for navigation
  console.error(error);
  return (
    <>
      <h1>Error 404</h1>
      <p>{error.statusText || error.message}</p>
    </>
  );
}
