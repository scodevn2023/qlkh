import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';
import { MongoClient } from 'mongodb';

export async function GET(req: Request) {
  try {
    const client: MongoClient = await clientPromise;
    const db = client.db('bkc_qlbanhang'); // Thay 'bkc_qlbanhang' bằng tên database của bạn

    const { searchParams } = new URL(req.url);
    // const userId = searchParams.get('userId');

    const purchaseHistoryCollection = db.collection('purchaseHistory');
    const purchaseHistory = await purchaseHistoryCollection.find({}).toArray();

    return NextResponse.json(purchaseHistory);
  } catch (error) {
    console.error('Error in GET /api/purchase-history:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const client: MongoClient = await clientPromise;
    const db = client.db('bkc_qlbanhang'); // Thay 'bkc_qlbanhang' bằng tên database của bạn

    const body = await req.json();
    const purchaseHistoryCollection = db.collection('purchaseHistory');
    const result = await purchaseHistoryCollection.insertOne(body);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/purchase-history:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
