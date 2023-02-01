import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, categories } from '@prisma/client';

const prisma = new PrismaClient();

async function getProductsCount(category: number, contains: string) {
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

  try {
    const response = await prisma.products.count({ where: where });
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
  const { category, contains } = req.query;
  try {
    const products = await getProductsCount(Number(category), String(contains));
    res.status(200).json({ items: products, message: `Success ` });
  } catch (err) {
    res.status(400).json({ message: `Fail  ` });
  }
}
