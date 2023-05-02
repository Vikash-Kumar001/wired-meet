import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../library/dbConnect'
import User from '../../models/user'

type User = {
  status : String;
};

type ResponseData = User[] | string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({})
        res.status(200).json(users)
      } catch (error) {
        res.status(400).json((error as any).message)
      }
      break;
    default:
      res.status(400).json('nothing available')
      break;
  }
}