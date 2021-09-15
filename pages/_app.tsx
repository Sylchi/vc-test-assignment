import 'tailwindcss/tailwind.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return <>
  <Head>
    <title>Visioncraft secret lair</title>
    <meta name="description" content="Test assignment for visioncraft" />
  </Head>
  <Component {...pageProps} />
  </>
}

export default MyApp
