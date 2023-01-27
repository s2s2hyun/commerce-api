import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/commons/layout/Layout';
import SubLayout from '../../components/commons/layout/SubLayout';

const CategorySlug = () => {
  const router = useRouter();

  const { slug, from, age } = router.query;

  return (
    <>
      <h1>
        Category {slug} from {from} {age}
      </h1>
    </>
  );
};

export default CategorySlug;

CategorySlug.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <Layout>
      <SubLayout>{page}</SubLayout>
    </Layout>
  );
};
