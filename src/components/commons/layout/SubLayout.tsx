import Link from 'next/link';
import React from 'react';

interface ISubLayoutProps {
  children: React.ReactNode;
}

const SubLayout = ({ children }: ISubLayoutProps) => {
  return (
    <div>
      <h1>
        <Link href="/"> Home 으로 </Link>
      </h1>
      {children}
    </div>
  );
};

export default SubLayout;
