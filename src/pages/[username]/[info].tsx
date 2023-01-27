import Layout from './../../components/commons/layout/Layout';
import SubLayout from './../../components/commons/layout/SubLayout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const UserNameInfo = () => {
  const router = useRouter();
  const { username, info, uid } = router.query;
  const [name, setName] = useState('?');

  // useEffect(() => {
  //   fetch('/api/user')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setName(data.name);
  //     });
  // }, []);

  useEffect(() => {
    if (uid != null) {
      fetch(`/api/user-info/${uid}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
        });
    }
  }, [uid]);

  return (
    <>
      <h1>
        {username}`s {info}
      </h1>
      <h1>Name: {name}</h1>
    </>
  );
};

export default UserNameInfo;

UserNameInfo.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <Layout>
      <SubLayout>{page}</SubLayout>
    </Layout>
  );
};
