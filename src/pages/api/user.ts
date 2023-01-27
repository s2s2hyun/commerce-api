import type { NextApiRequest, NextApiResponse } from 'next';
import { userDetail } from '../../constants/userDetail';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(userDetail);
}
