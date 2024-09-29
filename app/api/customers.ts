import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/db'
import { Db, MongoClient } from 'mongodb'

let cachedDb: Db | null = null

async function connectToDatabase(): Promise<Db> {
  if (cachedDb) {
    return cachedDb
  }

  const client: MongoClient = await clientPromise
  const db: Db = client.db('bkc_qlbanhang')
  cachedDb = db
  return db
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await connectToDatabase()
    const customersCollection = db.collection('customers')

    switch (req.method) {
      case 'GET': {
        const customers = await customersCollection.find({}).toArray()
        res.status(200).json(customers)
        break
      }
      case 'POST': {
        const newCustomer = req.body
        const result = await customersCollection.insertOne(newCustomer)
        res.status(201).json(result)
        break
      }
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
