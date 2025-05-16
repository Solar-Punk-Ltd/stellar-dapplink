import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import { MainLayout } from './layouts/Main/MainLayout';
import { Auth } from './pages/Auth';

export enum ROUTES {
  AUTH = '/passkey-widget',
}

const BaseRouter = (): ReactElement => {
  return (
    <MainLayout>
      <Routes>
        <Route path={ROUTES.AUTH} element={<Auth />} />
      </Routes>
    </MainLayout>
  );
};

export default BaseRouter;
