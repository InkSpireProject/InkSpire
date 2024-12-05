import { NextRequest, NextResponse } from 'next/server';
import connectToDB from '@/server/connectToDB';
import { User } from '@/server/models/usermodels';
import Rent from '@/server/models/rentmodels';
import Cart from '@/server/models/cartmodel';
import Book from '@/server/models/bookmodels';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDB();
    const { id } = params;

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        { message: 'User not found', status: false },
        { status: 404 }
      );
    }

    const { username } = user;

    const rentedBooks = await Rent.find({ username }).populate('book');

    const cartItems = await Cart.find({ username }).populate('book');

    const lendedBooks = await Book.find({ username });

    return NextResponse.json(
      {
        message: 'Data fetched successfully',
        status: true,
        data: {
          rentedBooks,
          cartItems,
          lendedBooks,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error ', error);
    return NextResponse.json(
      { message: 'Internal Server Error', status: false },
      { status: 500 }
    );
  }
}
