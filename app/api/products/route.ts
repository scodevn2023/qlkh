import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';
import { MongoClient } from 'mongodb';

export async function GET(req: Request) {
  try {
    const client: MongoClient = await clientPromise;
    const db = client.db('bkc_qlbanhang'); // Thay 'bkc_qlbanhang' bằng tên database của bạn

    // Nếu bạn cần sử dụng req để lấy thông tin nào đó, hãy làm như sau
    const { searchParams } = new URL(req.url);
    // Ví dụ: const page = searchParams.get('page');

    const productsCollection = db.collection('products');
    const products = await productsCollection.find({}).toArray();

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error in GET /api/products:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const client: MongoClient = await clientPromise;
    const db = client.db('bkc_qlbanhang'); // Thay 'bkc_qlbanhang' bằng tên database của bạn

    const body = await req.json();
    const productsCollection = db.collection('products');
    const result = await productsCollection.insertOne(body);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/products:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
