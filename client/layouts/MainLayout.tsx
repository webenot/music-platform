import React, { FC, ReactElement, ReactNode } from 'react';
import { Container } from '@material-ui/core';

import { Navbar } from 'components/Navbar';

type TProps = {
  children?: ReactNode;
}

export const MainLayout: FC<TProps> = ({ children }: TProps): ReactElement => (
  <>
    <Navbar>
      <Container className="container">
        {children}
      </Container>
    </Navbar>
  </>
);

MainLayout.defaultProps = { children: '' };
