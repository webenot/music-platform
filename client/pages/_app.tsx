import type { AppProps } from 'next/app';

import '@Styles/common.sass';

function MyApp ({
  Component,
  pageProps,
}: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
