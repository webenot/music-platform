import React, { FC, ReactElement, ReactNode } from 'react';

import { Navbar } from 'components/Navbar';

type TProps = {
  children?: ReactNode;
}

export const MainLayout: FC<TProps> = ({ children }: TProps): ReactElement => (
  <>
    <Navbar>
      <div className="container">
        {children}
      </div>
    </Navbar>
  </>
);

MainLayout.defaultProps = { children: '' };
