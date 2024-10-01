"use server";
import connectToDB from "./connectToDB";
import Book from '@/server/models/bookmodels';

interface res_el {
    _id: string;
    name: string;
    url: string;
    author: string;
    description: string;
    price: number;
    isbn: string;
}

export async function bookData() {
  await connectToDB();

  const response:res_el[] = await Book.find({});
  // console.log(response)
  return response; 
}

export async function getBookById(id: string){
  await connectToDB();

  const book:res_el = await Book.findById(id).lean();
  if(!book) throw new Error("Book not found!!");

  // console.log(book);
  return book;
}

export async function searchHandler(bookname: string, authorname: string) {
  try {
    await connectToDB();
    console.log(bookname, authorname);

    const query: any = {};
    
    if (bookname) {
      query.name = { $regex: bookname, $options: 'i' };
    }

    if (authorname) {
      query.author = { $regex: authorname, $options: 'i' };
    }
    const books: res_el[] = await Book.find(query);

    if (books.length > 0) {
      return books;
    } else {
      return null;
    }
  } catch (err) {
    console.log("Error fetching the books!! ", err);
  }
}


