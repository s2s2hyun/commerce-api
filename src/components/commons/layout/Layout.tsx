import React from 'react';

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = (props: ILayoutProps) => {
  return <div>{props.children}</div>;
};

export default Layout;
