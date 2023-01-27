import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { uid } = req.query;
  const cookies = req.cookies;
  res.status(200).json({ name: `kim ${uid} ${JSON.stringify(cookies)}` });
  // res.status(404).send({ error: 'error' });
  // res.redirect(307, '/api/user');
}
