export const CATEGORY_MAP = ['Sneakers', 'T-Shirt', 'Pants', 'Cap', 'Hoodie'];

export const TAKE = 9;

export const FILTERS = [
  {
    label: '최신순',
    value: 'latest',
  },
  {
    label: '가격 높은순',
    value: 'expensive',
  },
  {
    label: '가격 낮은순',
    value: 'cheap',
  },
];

export const getOrderBy = (orderBy?: string) => {
  if (orderBy === 'latest') {
    return { orderBy: { createdAt: 'desc' } };
  } else if (orderBy === 'expensive') {
    return { orderBy: { price: 'desc' } };
  } else if (orderBy === 'cheap') {
    return { orderBy: { price: 'asc' } };
  }
  return undefined;
};
