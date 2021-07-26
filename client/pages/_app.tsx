import React, { FC } from 'react';
import { AppProps } from 'next/app';

import '@Styles/common.sass';

import { wrapper } from 'store';

const WrappedApp: FC<AppProps> = ({
  Component,
  pageProps,
}) => (
  <Component {...pageProps} />
);

export default wrapper.withRedux(WrappedApp);
