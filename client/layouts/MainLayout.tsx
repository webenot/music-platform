import React, { FC, ReactElement, ReactNode } from 'react';
import Head from 'next/head';

import { Navbar } from 'components/Navbar';
import { AudioPlayer } from 'components/AudioPlayer';

type TProps = {
  children?: ReactNode;
  title?: string;
  description?: string;
  robots?: string;
  keywords?: string;
}

export const MainLayout: FC<TProps> = ({
  children,
  title = '',
  description = '',
  robots = 'index,follow',
  keywords = '',
}: TProps): ReactElement => (
  <>
    <Head>
      <title>{`${title ? title + ' > ' : ''}Music Platform`}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={`Music Platform. ${description}`} />
      <meta name="robots" content={robots} />
      <meta name="keywords" content={`music,platform,music platform,track,artist,${keywords}`} />
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
