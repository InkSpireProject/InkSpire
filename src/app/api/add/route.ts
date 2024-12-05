import connectToDB from "@/server/connectToDB";
import Book from "@/server/models/bookmodels";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, url, author, description, price, isbn, username } = body;

    if (!name || !url || !author || !description || !price || !isbn || !username) {
      return NextResponse.json(
        { message: "Please provide all fields correctly", status: false},
        { status: 400 }
      );
    }

    await connectToDB();

    const newBook = new Book({
      name,
      url,
      author,
      description,
      price,
      isbn,
      username:username
    });

    await newBook.save();
    return NextResponse.json(
      { message: "Book created successfully", book: newBook, status: true },
      { status: 201 }
    );

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "An error occurred while creating the book", status: false },
      { status: 500 }
    );
  }
}