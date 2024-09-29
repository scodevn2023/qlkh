import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = "mongodb://root:Thienan123@localhost:27017/bkc_qlbanhang?authSource=admin";
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    return client.db("bkc_qlbanhang");
  } catch (error) {
    console.error("Failed to connect to the database", error);
    throw new Error("Database connection failed");
  }
}

export async function GET() {
  try {
    const db = await connectToDatabase();
    const customers = await db.collection('customers').find().toArray();
    return NextResponse.json(customers);
  } catch (error) {
    console.error('Failed to fetch customers:', error);
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, address, potentialProducts, notes, potentialLevel } = body;

    const db = await connectToDatabase();
    const newCustomer = {
      name,
      phone,
      address,
      potentialProducts: potentialProducts || [],
      notes: notes || [],
      potentialLevel: potentialLevel || 1,
    };

    const result = await db.collection('customers').insertOne(newCustomer);
    return NextResponse.json({ ...newCustomer, _id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Failed to add customer:', error);
    return NextResponse.json({ error: 'Failed to add customer' }, { status: 500 });
  } finally {
    await client.close();
  }
}
