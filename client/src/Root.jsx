import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "./AuthComponent";
import './assets/root.css'

// Add imports from Mo's branch
import {
  Link,
  useParams,
  useSearchParams,
  useRouteError,
  useLocation,
} from "react-router-dom";
import { useAuth } from "./authentication/AuthComponent";

export function Root(props) {
  const location = useLocation(); // Get the current page location
  const { children } = props;
  const { user } = useAuth();


  const handleLogin = async () => {
    console.log('User: ', user);
  }


  // Determine if the navigation should have the specific style
  const isPetPage = location.pathname === "/pet"; 


  return (
    <>
      <nav className={`nav ${isPetPage ? 'nav-pet' : ''}`}>
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
          <li>
            <NavLink to="/pet">Pet</NavLink>
          </li>
          {user && ( // Conditionally render the button if user is logged in
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
          )}
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
