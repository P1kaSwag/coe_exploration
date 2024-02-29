import React from "react";
import {
  Link,
  NavLink,
  Outlet,
  useParams,
  useSearchParams,
  useRouteError,
  useLocation,
} from "react-router-dom";
import { useAuth } from "./AuthComponent";

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
            <NavLink to="/" className="home">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/quiz">Quiz</NavLink>
          </li>
          <li>
            <NavLink to="/explore">Explore</NavLink>
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
      </nav>
      <main>{children || <Outlet />}</main>
    </>
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