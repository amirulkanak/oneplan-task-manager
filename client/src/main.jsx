import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/globalStyles.css';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/Routes';
import UserAuthContextProvider from '@/context/UserAuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// tanstack query client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserAuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </UserAuthContextProvider>
  </StrictMode>
);
