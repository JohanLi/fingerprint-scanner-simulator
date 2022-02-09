import type { AppProps } from 'next/app';
import Head from 'next/head';

import '../global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta
          name="description"
          content="Practice the Fingerprint Scanner hack of the GTA Online Casino Heist using this simulator."
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="/favicon-7b2b909ae59ca59d32fae4656050a4bc.ico"
        />
        <title>Fingerprint Scanner Simulator - GTA Online Casino Heist</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
