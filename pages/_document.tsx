import { Head, Html, Main, NextScript } from 'next/document';


export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>NextJS Auth</title>
        <meta
          name="description"
          content="Next.js app with Auth and later, Sanity"
          key="desc"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}