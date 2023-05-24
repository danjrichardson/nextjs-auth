import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google'
import { SessionProvider } from "next-auth/react"

import '../global.css'
const inter = Inter({ subsets: ['latin'] })
 
export default function MyApp({ Component, pageProps }: AppProps) {
  const { session } = pageProps;
  return <div className={inter.className}>
    <SessionProvider session={session}>
      <Component session={session} {...pageProps} />
    </SessionProvider>
  </div>
}