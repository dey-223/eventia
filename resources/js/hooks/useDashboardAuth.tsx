
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useDashboardAuth = () => {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const checkUser = () => {
            const userStr = localStorage.getItem('currentUser');
            const token = localStorage.getItem('token');

            if (!token) {
                // Redirect to login if no token found
                navigate('/login');
                return;
            }

            if (userStr) {
                try {
                    const user = JSON.parse(userStr);
                    setCurrentUser(user);
                } catch (e) {
                    console.error("Error parsing user data:", e);
                    setCurrentUser(null);
                    navigate('/login');
                }
            } else {
                setCurrentUser(null);
                navigate('/login');
            }
        };

        checkUser();

        // Listen for storage changes
        window.addEventListener('storage', checkUser);

        return () => {
            window.removeEventListener('storage', checkUser);
        };
    }, [navigate]);

    return { currentUser };
};

export default useDashboardAuth;