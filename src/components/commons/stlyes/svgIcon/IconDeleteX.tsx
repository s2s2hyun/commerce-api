import React from 'react';

interface IconDeleteXProps {
  style?: React.CSSProperties;
}

const IconDeleteX: React.FC<IconDeleteXProps> = ({ style }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-x"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        style={style}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />{' '}
        <path d="M18 6l-12 12" /> <path d="M6 6l12 12" />{' '}
      </svg>
    </>
  );
};

export default IconDeleteX;