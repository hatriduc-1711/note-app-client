import { createBrowserRouter, Outlet } from 'react-router-dom';

import AuthProvider from '../context/AuthProvider';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import ProtectedRouter from './ProtectedRouter';
import NotesList from '../components/NotesList';
import Note from '../components/Note';
import config from '../config';

const NoteApp = () => {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    );
};

const router = createBrowserRouter([
    {
        element: <NoteApp />,
        children: [
            {
                element: <Login />,
                path: config.router.login,
            },
            {
                element: <ProtectedRouter />,
                children: [
                    {
                        element: <Home />,
                        path: config.router.home,
                        children: [
                            {
                                element: <NotesList />,
                                path: 'folders/:folderId',
                                children: [
                                    {
                                        element: <Note />,
                                        path: 'notes/:noteId',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                element: <NotFound />,
                path: config.router.notFound,
            },
        ],
    },
]);

export default router;
