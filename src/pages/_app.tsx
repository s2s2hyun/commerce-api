import '/styles/globals.css';
import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import { globalStyles } from '../components/commons/stlyes/globalStyles';
import Layout from '../components/commons/layout/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity },
    },
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Global styles={globalStyles} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </>
  );

  // const getLayout =
  //   Component.getLayout || ((page: React.ReactNode) => <Layout>{page}</Layout>);
  // return getLayout(<Component {...pageProps} />);
}
