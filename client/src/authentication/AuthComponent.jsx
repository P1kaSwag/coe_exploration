import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (i.e. user data is stored in local storage) on first render
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('access_token');
    if (storedUser && storedToken) {
      const decodedToken = jwtDecode(storedToken);
      if (decodedToken.exp * 1000 < Date.now()) { // Check if token is expired
        logout();
      } else {
        setUser(JSON.parse(storedUser));
        setAccessToken(storedToken);
      }
    }
    setLoading(false);
  }, []);

  const login = async (userData, token) => {
    // Set user data and access token in state and local storage
    setUser(userData);
    setAccessToken(token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('access_token', token);
  };

  if (loading) {
    return <div>Loading...</div>; // Render a loading state while checking authentication
  }

  const logout = () => {
    // Clear user data and access token from state and local storage
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
