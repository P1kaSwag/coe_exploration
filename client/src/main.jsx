import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { Root, ErrorPage } from './Root'; 
import LoginComponent from './authentication/LoginComponent';
import Quiz from './quiz/Quiz';
import RegisterComponent from './authentication/RegisterComponent';
import Explore, { MajorInfo } from './explore/Explore';
import { AuthProvider } from './authentication/AuthComponent';
import Pet from './pet/Pet';
import MinigameLoader from './explore/minigames/MinigameLoader';
import Home from './home/Home'
import HowTo from './home/HowTo';
import PrivateRoute from './PrivateRoute';

import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Root><ErrorPage /></Root>,
    children: [
      { index: true, element: <Home /> }, // Set Home component as index
      {
        path: "login",
        element: <LoginComponent />,
      },
      {
        path: "howto",
        element: <HowTo />,
      },
      {
        path: "quiz",
        element: <PrivateRoute />, // Protect this route
        children: [
          { index: true, element: <Quiz /> },
        ],
      },
      {
        path: "register",
        element: <RegisterComponent />,
      },
      {
        path: "explore",
        element: <PrivateRoute />, // Protect this route
        children: [
          { index: true, element: <Explore /> },
          {
            path: ":majorName",
            element: <MajorInfo />,
          },
          {
            path: ":majorName/minigame",
            element: <MinigameLoader />,
          },
        ],
      },
      {
        path: "pet",
        element: <PrivateRoute />, // Protect this route
        children: [
          { index: true, element: <Pet /> },
        ],
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} /> {/* Using RouterProvider */}
    </AuthProvider>
  </React.StrictMode>
);