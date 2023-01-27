import '/styles/globals.css';
import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import { globalStyles } from '../components/commons/stlyes/globalStyles';
import Layout from '../components/commons/layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  // return (
  //   <>
  //     <Global styles={globalStyles} />
  //     <Layout>
  //       <Component {...pageProps} />
  //     </Layout>
  //   </>
  // )

  const getLayout =
    Component.getLayout || ((page: React.ReactNode) => <Layout>{page}</Layout>);
  return getLayout(<Component {...pageProps} />);
}
