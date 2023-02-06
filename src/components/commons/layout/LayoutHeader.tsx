// import React from 'react'
import Image from 'next/image';
import { IconHome, IconShoppingCart, IconUser } from '@tabler/icons';
import { useSession } from 'next-auth/react';

// const LayoutHeader = () => {
//   return (
//     <div>LayoutHeader</div>
//   )
// }

// export default LayoutHeader

export default function LayoutHeader() {
  const { data: session } = useSession();
  return (
    <div className="mt-12 mb-12">
      <div className="w-full flex h-50 items-center justify-center">
        <IconHome />
        <span className="m-auto" />
        <IconShoppingCart />
        {session ? (
          <Image
            src={session.user?.image!}
            width={30}
            height={30}
            style={{ borderRadius: '50%' }}
            alt="photo"
          />
        ) : (
          <IconUser />
        )}
      </div>
    </div>
  );
}
