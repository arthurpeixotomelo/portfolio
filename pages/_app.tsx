import { AppProps } from "next/app"
import Head from "next/head"
import "../styles/main.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="color-scheme" content="dark light" />
      </Head>
        <Component {...pageProps} />
    </>
  );
};

export default MyApp