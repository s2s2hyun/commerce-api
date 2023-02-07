import { getOrderBy } from './../../constants/products';
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getProducts({
  skip,
  take,
  category,
  orderBy,
  contains,
}: {
  skip: number;
  take: number;
  category: number;
  orderBy: string;
  contains: string;
}) {
  const containsCondition =
    contains && contains !== ''
      ? {
          name: { contains: contains },
        }
      : undefined;
  const where =
    category && category !== -1
      ? {
          category_id: category,
          ...containsCondition,
        }
      : containsCondition
      ? containsCondition
      : undefined;
  const orderByCondition = getOrderBy(orderBy);
  try {
    const response = await prisma.products.findMany({
      skip: skip,
      take: take,
      // ...where,
      ...orderByCondition,

      // orderbycondition 을 그냥 넣어주면 동작을 안합니다. 객체로 주입을 해주고 있고 그 객체가 constans 에
      // 정의 해두었던 포맷에 내용물만 전달해주려면 ... 스프레드를 사용해야만 한다.
      // orderBy: {
      //   price: 'asc',
      // },
      where: where,
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
}

type Data = {
  items?: any;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { skip, take, category, orderBy, contains } = req.query;

    if (skip == null || take == null) {
      res.status(400).json({ message: 'no skip or take' });
      return;
    }

    const products = await getProducts({
      skip: Number(skip),
      take: Number(take),
      category: Number(category),
      orderBy: String(orderBy),
      contains: contains ? String(contains) : '',
    });
    res.status(200).json({ items: products, message: `Success ` });
  } catch (err) {
    res.status(400).json({ message: `Fail  ` });
  }
}
