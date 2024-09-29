import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/db'
import { getSession } from 'next-auth/react'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const client = await clientPromise
  const db = client.db('bkc_qlbanhang')
  const salesCollection = db.collection('sales')

  switch (req.method) {
    case 'GET':
      const sales = await salesCollection.find({}).toArray()
      res.status(200).json(sales)
      break
    case 'POST':
      if (session.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' })
      }
      const newSale = req.body
      await salesCollection.insertOne(newSale)
      res.status(201).json(newSale)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
