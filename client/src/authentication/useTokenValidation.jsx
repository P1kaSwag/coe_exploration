import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from './AuthComponent';
import { useNavigate, useLocation } from 'react-router-dom';

// Use this hook to check if the access token is expired and logout the user if it is
const useTokenValidation = () => {
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkToken = () => {
      if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        if (decodedToken.exp * 1000 < Date.now()) {
          logout();
          navigate('/login'); // Redirect to login page
        }
      }
    };

    checkToken();
  }, [accessToken, navigate, logout, location]);
};

export default useTokenValidation;
