import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { PageLoader } from '../index.js';

function AuthLayout({ path, children }) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const userCookie = Cookies.get('user');
        const accessTokenCookie = Cookies.get('accessToken');

        if (userCookie && accessTokenCookie) {
            const user = JSON.parse(decodeURIComponent(userCookie));
            const token = accessTokenCookie;
            const isAdmin = user.isAdmin;

            if (path === "/admin") {
                if (isAdmin && token) {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            } else if (path === "/home") {
                if (token) {
                    navigate("/home");
                } else {
                    navigate("/");
                }
            } else {
                navigate("/");
            }
        } else {
            navigate("/");
        }

        setLoading(false);
    }, [path, navigate]);

    return loading ? (
        <PageLoader />
    ) : (
        <>{children}</>
    );
}

export default AuthLayout;
