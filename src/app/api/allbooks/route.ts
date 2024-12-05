import { NextRequest, NextResponse } from 'next/server';
import connectToDB from "@/server/connectToDB";
import Books from '@/server/models/bookmodels';

export async function GET(request: NextRequest) {
  try {
    await connectToDB();
    const books = await Books.find({});
    
    if (books.length > 0) {
      return NextResponse.json({ books: books, status: true }, { status: 200 });
    } else {
      return NextResponse.json({ message: "No books found", status: false }, { status: 404 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal Server Error", status: false }, { status: 500 });
  }
}