import React, { FC, ReactElement, ReactNode } from 'react';
import Head from 'next/head';

import { Navbar } from 'components/Navbar';
import { AudioPlayer } from 'components/AudioPlayer';

type TProps = {
  children?: ReactNode;
  title?: string;
}

export const MainLayout: FC<TProps> = ({
  children,
  title = '',
}: TProps): ReactElement => (
  <>
    <Head>
      <title>{`${title ? title + ' > ' : ''}Music Platform`}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Navbar>
      <div className="container">
        {children}
      </div>
    </Navbar>
    <AudioPlayer />
  </>
);

MainLayout.defaultProps = { children: '' };
