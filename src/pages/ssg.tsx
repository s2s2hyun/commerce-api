import Layout from '../components/commons/layout/Layout';
import SubLayout from '../components/commons/layout/SubLayout';
import Head from 'next/head';
import Link from 'next/link';

export default function SSG({ time }: { time: string }) {
  const handleClick = () => {
    fetch('/api/add-item?name=Jacket')
      .then((res) => res.json())
      .then((data) => alert(data.message));
  };

  return (
    <>
      <h1>{time}</h1>
      <h1>ssg입니다</h1>
    </>
  );
}

export async function getStaticProps() {
  console.log('server');
  return {
    props: { time: new Date().toISOString() },
  };
}

// SSG.getLayout = function getLayout(page: React.ReactNode) {
//   return (
//     <Layout>
//       <SubLayout>{page}</SubLayout>
//     </Layout>
//   );
// };
