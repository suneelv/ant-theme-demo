import { Navigate, createBrowserRouter } from 'react-router';
import { Experiments } from '../Experiments/Experiments';
import { Home } from '../Home/Home';
import { ThemeDemo } from '../ThemeDemo/ThemeDemo';
import { AppLayout } from './AppLayout';
import { Path } from './paths';

export const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: Path.Diff, element: <ThemeDemo /> },
            { path: Path.Experiments, element: <Experiments /> },
            { path: '*', element: <Navigate to={Path.Home} replace /> },
        ],
    },
]);
