import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem('authUser'); // Example: Check token in localStorage or state
    return isLoggedIn !== "undefined" ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
