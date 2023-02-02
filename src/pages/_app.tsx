import '/styles/globals.css';
import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import { globalStyles } from '../components/commons/stlyes/globalStyles';
import Layout from '../components/commons/layout/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { CLIENT_ID } from 'src/constants/googleAuth';
import { SessionProvider } from 'next-auth/react';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity },
    },
  });
  return (
    <>
      {/* <GoogleOAuthProvider clientId={CLIENT_ID}> */}
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Global styles={globalStyles} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </SessionProvider>
      {/* </GoogleOAuthProvider> */}
    </>
  );

  // const getLayout =
  //   Component.getLayout || ((page: React.ReactNode) => <Layout>{page}</Layout>);
  // return getLayout(<Component {...pageProps} />);
}
