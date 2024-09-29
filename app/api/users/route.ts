import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';
import { MongoClient } from 'mongodb';

export async function GET(req: Request) {
  try {
    const client: MongoClient = await clientPromise;
    const db = client.db('bkc_qlbanhang'); // Thay 'bkc_qlbanhang' bằng tên database của bạn

    const usersCollection = db.collection('users');
    const users = await usersCollection.find({}).toArray();

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error in GET /api/users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const client: MongoClient = await clientPromise;
    const db = client.db('bkc_qlbanhang'); // Thay 'bkc_qlbanhang' bằng tên database của bạn

    const body = await req.json();
    const usersCollection = db.collection('users');
    const result = await usersCollection.insertOne(body);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
