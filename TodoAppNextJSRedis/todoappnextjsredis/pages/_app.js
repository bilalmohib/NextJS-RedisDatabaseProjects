import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="description" content="A todo app built with Next JS,redis,Node JS and Express" />
      <meta name="keywords" content="TodoApp,NextJS,Redis,NodeJS,Express,Realtime" />
      <meta name="author" content="Muhammad-Bilal-7896" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />

      <Script
        type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.5.0/mdb.min.js"
      ></Script>
      <title>NextJSRedisTodoApp</title>
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp;