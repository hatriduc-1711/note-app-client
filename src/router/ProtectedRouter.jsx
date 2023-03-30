import { Outlet, useNavigate } from 'react-router-dom';

function ProtectedRouter() {
    const navigate = useNavigate();
    if (!localStorage.getItem('accessToken')) navigate('/login');

    return <Outlet />;
}

export default ProtectedRouter;
