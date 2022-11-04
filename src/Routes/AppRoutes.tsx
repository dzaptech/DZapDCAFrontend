import React from 'react';
import { Route, Routes } from 'react-router-dom';

const DashboardPage = React.lazy(() => import('./DCA/Dashboard/DashboardPage'));
const CreatePage = React.lazy(() => import('./DCA/Create/CreatePage'));

function AppRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <React.Suspense fallback={<>...</>}>
            <DashboardPage />
          </React.Suspense>
        }
      />
      <Route
        path="/create"
        element={
          <React.Suspense fallback={<>...</>}>
            <CreatePage />
          </React.Suspense>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
