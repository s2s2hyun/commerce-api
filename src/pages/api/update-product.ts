import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

async function updateProduct(id: number, contents: string) {
  try {
    const response = await prisma.products.update({
      where: {
        id: id,
      },
      data: {
        contents: contents,
      },
    });
    // console.log(response);
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
  const { id, contents } = JSON.parse(req.body);
  if (id == null || contents == null) {
    res.status(400).json({ message: `no id or contents` });
  }
  try {
    const products = await updateProduct(Number(id), contents);
    res.status(200).json({ items: products, message: `Success ` });
  } catch (err) {
    res.status(400).json({ message: `Fail  ` });
  }
}
