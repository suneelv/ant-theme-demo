import { Navigate, createBrowserRouter } from 'react-router';
import { Experiments } from '../Experiments/Experiments';
import { ThemeDemo } from '../ThemeDemo/ThemeDemo';
import { AppLayout } from './AppLayout';
import { Path } from './paths';

export const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            { index: true, element: <ThemeDemo /> },
            { path: Path.Experiments, element: <Experiments /> },
            { path: '*', element: <Navigate to={Path.Home} replace /> },
        ],
    },
]);
