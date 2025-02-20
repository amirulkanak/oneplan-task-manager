import MainLayout from '@/layouts/MainLayout';
import { createBrowserRouter } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import Dashboard from '@/pages/Dashboard';

const routes = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);

export default routes;
