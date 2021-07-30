import React, { FC, ReactElement } from 'react';

import { MainLayout } from 'layouts/MainLayout';

const MyComponent: FC = (): ReactElement => (
  <MainLayout>
    <div className="center">
      <h1>Добро пожаловать!</h1>
      <h3>Здесь собраны лучшие треки!</h3>
    </div>
  </MainLayout>
);

export default MyComponent;
