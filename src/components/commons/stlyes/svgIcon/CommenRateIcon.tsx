import React from 'react';
import { CommentItemType } from 'src/pages/products/[id]';

interface CommenRateIconProps {
  fill: string;
  stroke: number;
  index: number;
  item: CommentItemType;
}

const CommenRateIcon: React.FC<CommenRateIconProps> = ({
  fill,
  stroke,
  index,
  item,
}) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-star"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill={index < item.rate ? fill : 'none'}
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />{' '}
        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />{' '}
      </svg>
    </>
  );
};

export default CommenRateIcon;
