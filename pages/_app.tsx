import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

import '../global.css';
import Head from 'next/head';
const inter = Inter({ subsets: ['latin'] });

export default function MyApp({ Component, pageProps }: AppProps) {
  const { session } = pageProps;
  return (
    <>
      <Head>
        <title>NextJS Auth</title>
      </Head>
      <div className={inter.className}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </div>
    </>
  );
}
