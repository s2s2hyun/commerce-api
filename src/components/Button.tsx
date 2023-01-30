import styled from '@emotion/styled';
import React from 'react';

// interface Props {
//   children: string;
//   onClick: () => void;
// }

// const Button = ({ children, onClick }: Props) => {
//   return <button onClick={onClick}>{children}</button>;
// };

const Button = styled.button`
  padding: 16px;
  border-radius: 8px;
  background-color: hotpink;
`;

export default Button;
