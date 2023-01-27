import Layout from '../../../components/commons/layout/Layout';
import SubLayout from '../../../components/commons/layout/SubLayout';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const MyInfo = () => {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const { status = 'initail' } = router.query;

  return (
    <>
      <h1>MyInfo</h1>
      <h1>Clicked {String(clicked)}</h1>
      <h1>Status {status}</h1>
      <button
        onClick={() => {
          alert('edit');
          setClicked(true);
          location.replace('/settings/my/info?status=editing');
          //   state가 값을 잃어버리는걸 볼수 있었다.
        }}
      >
        edit(replace)
      </button>
      <br />
      <button
        onClick={() => {
          alert('edit');
          setClicked(true);
          router.push('/settings/my/info?status=editing');
          //   state 값을 저장하는걸 볼수있다.
        }}
      >
        edit(push)
      </button>
      <br />
      <button
        onClick={() => {
          alert('edit');
          setClicked(true);
          router.push('/settings/my/info?status=editing', undefined, {
            shallow: true,
          });
          //   state 값을 저장하는걸 볼수있다. 데이터 패칭이 안된다 .
        }}
      >
        edit(shallow)
      </button>
    </>
  );
};

export default MyInfo;

MyInfo.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <Layout>
      <SubLayout>{page}</SubLayout>
    </Layout>
  );
};
