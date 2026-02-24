import { RouterProvider } from 'react-router';
import { AppProvider } from './contexts/AppContext';
import { router } from './routes';
import React from 'react';

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}
