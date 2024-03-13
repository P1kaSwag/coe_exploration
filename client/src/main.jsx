import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root, ErrorPage } from './Root';
import LoginComponent from './LoginComponent';
import Quiz from './quiz/Quiz';
import RegisterComponent from './RegisterComponent';
import Explore, { MajorInfo } from './explore/Explore';
import { AuthProvider } from './AuthComponent';
import Profile from './ProfileComponent';
import Pet from './Pet'

import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Root><ErrorPage /></Root>,
    children: [
      { index: true, element: <LoginComponent /> }, // HomeComponent
      {
        path: "quiz",
        element: <Quiz />,
      },
      {
        path: "register",
        element: <RegisterComponent />,
      },
      {
        path: "explore",
        element: <Explore />,
        // children: [
        //  { 
        //    path: ":majorName", 
        //    element: <MajorInfo /> 
        //  },
        //]
      },
      {
        path: "explore/:majorName",
        element: <MajorInfo />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "pet",
        element: <Pet />,
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