import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

async function getProduct(id: number) {
  try {
    const response = await prisma.products.findUnique({
      where: {
        id: id,
      },
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
  const { id } = req.query;
  if (id == null) {
    res.status(400).json({ message: `no id` });
  }
  try {
    const products = await getProduct(Number(id));
    res.status(200).json({ items: products, message: `Success ` });
  } catch (err) {
    res.status(400).json({ message: `Fail  ` });
  }
}
