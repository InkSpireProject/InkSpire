import connectToDB from "@/server/connectToDB";
import Book from "@/server/models/bookmodels";
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { name, author } = body;

    if (!name && !author) {
      return NextResponse.json({ message: "Enter a search term", status: false });
    }

    await connectToDB();

    let query = {};

    if (name && author) {
      query = {
        $and: [
          { name: { $regex: name, $options: 'i' } },
          { author: { $regex: author, $options: 'i' } }
        ]
      };
    } else if (name) {
      query = { name: { $regex: name, $options: 'i' } };
    } else if (author) {
      query = { author: { $regex: author, $options: 'i' } };
    }

    const books = await Book.find(query);

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