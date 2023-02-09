// import React from 'react'
import Image from 'next/image';
import { IconHome, IconShoppingCart, IconUser } from '@tabler/icons';
import { useSession } from 'next-auth/react';
import MyHome from '../stlyes/svgIcon/MyHome';
import MyShopCart from '../stlyes/svgIcon/MyShopCart';
import { Grid } from '@mui/material';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import MyIconUser from '../stlyes/svgIcon/MyIconUser';
import IconHeart from '../stlyes/svgIcon/IconHeart';

// const LayoutHeader = () => {
//   return (
//     <div>LayoutHeader</div>
//   )
// }

// export default LayoutHeader

export default function LayoutHeader() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="mt-12 mb-12">
      <div className="w-full flex h-50 items-center">
        {/* <IconHome /> */}
        <div onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
          <MyHome />
        </div>
        <span className="m-auto" />
        <div
          className="mr-4"
          onClick={() => router.push('/wishlist')}
          style={{ cursor: 'pointer' }}
        >
          <IconHeart />
        </div>
        <div
          className="mr-4"
          onClick={() => router.push('/cart')}
          style={{ cursor: 'pointer' }}
        >
          <MyShopCart />
        </div>
        {session ? (
          <Image
            src={session.user?.image!}
            width={30}
            height={30}
            style={{ borderRadius: '50%', cursor: 'pointer' }}
            alt="photo"
            onClick={() => router.push('/mypage')}
          />
        ) : (
          <div
            onClick={() => router.push('/auth/login ')}
            style={{ cursor: 'pointer' }}
          >
            <MyIconUser />
          </div>
        )}
      </div>
    </div>
  );
}
