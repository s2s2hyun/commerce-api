import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/commons/layout/Layout';
import SubLayout from '../../components/commons/layout/SubLayout';

const CartDateSlug = () => {
  const router = useRouter();
  const { date } = router.query;

  return (
    <>
      <h1>Cart Date Slug {JSON.stringify(date)}</h1>
      <Link href="/cart/2022/06/05"> 2023년 1월 27일 </Link>
      <br />
      <button onClick={() => router.push('/cart/2022/01/28')}>
        2023년 01월 28일{' '}
      </button>
    </>
  );
};

export default CartDateSlug;

// CartDateSlug.getLayout = function getLayout(page: React.ReactNode) {
//   return (
//     <Layout>
//       <SubLayout>{page}</SubLayout>
//     </Layout>
//   );
// };
