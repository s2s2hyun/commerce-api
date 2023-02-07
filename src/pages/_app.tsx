import '/styles/globals.css';
import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import { globalStyles } from '../components/commons/stlyes/globalStyles';
import Layout from '../components/commons/layout/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { SessionProvider } from 'next-auth/react';
import LayoutHeader from 'src/components/commons/layout/LayoutHeader';
import LayoutFooter from 'src/components/commons/layout/LayoutFooter';

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
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Global styles={globalStyles} />
          <div className="px-36">
            <LayoutHeader />
            <Component {...pageProps} />
            <LayoutFooter />
          </div>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );

  // const getLayout =
  //   Component.getLayout || ((page: React.ReactNode) => <Layout>{page}</Layout>);
  // return getLayout(<Component {...pageProps} />);
}
