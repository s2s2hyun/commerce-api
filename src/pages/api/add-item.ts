import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: 'secret_RaBHxW8386ITKgOkg9gwvNK0jsvINJH1aICOAQwqipj',
});

const databaseId = '4335db68f5de4e4fbe5919561fbc6045';

async function addItem(name: string) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
    });
    console.log(response);
  } catch (err) {
    console.log(JSON.stringify(err));
  }
}

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name } = req.query;

  if (name === null) {
    return res.status(400).json({ message: 'No name' });
  }

  try {
    await addItem(String(name));
    console.log(name);
    res.status(200).json({ message: `Success ${name} added` });
  } catch (err) {
    res.status(400).json({ message: `Fail  ${name} added` });
  }
}
