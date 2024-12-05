import { NextRequest, NextResponse } from 'next/server';
import connectToDB from "@/server/connectToDB";
import Books from '@/server/models/bookmodels';
import Rent from '@/server/models/rentmodels';
import { User } from '@/server/models/usermodels';
import Cart from '@/server/models/cartmodel';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const {id} = params;
        let body;
        try {
            body = await req.json();
        } catch (parseError) {
            return NextResponse.json(
                { message: "Invalid JSON in request body", status: false },
                { status: 400 }
            );
        }
        
        const {username} = body;

        if (!username) {
            return NextResponse.json(
                { message: "Username is required", status: false }, 
                { status: 400 }
            );
        }   

        await connectToDB();
        const user = await User.findOne({ username });
        
        if (!user) {
            return NextResponse.json(
                { message: "User not found", status: false },
                { status: 404 }
            );
        }
        const book = await Books.findById(id);
        if(book){
            const cartBook = await new Cart({ username, book, isReturned:false });
            cartBook.save();
            return NextResponse.json({
                book: cartBook,
                message: "Successfully retrieved cart books",
                status: true
            }, {
                status: 200
            });
        }
        else{
            return NextResponse.json({
                message: "Some error occured while renting",
                status: true
            }, {
                status: 400
            });
        }
            
    } catch (error) {
        console.error('Error :', error);
        return NextResponse.json(
            { message: "Internal Server Error", status: false }, 
            { status: 500 }
        );
    }
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const {id} = params;
        const cartBook = await Cart.findById(id);
        if(cartBook){
            const deletedFromCart = await Cart.findByIdAndDelete(id);
            return NextResponse.json({
                book: deletedFromCart,
                message: "Successfully deleted cart book",
                status: true
            }, {
                status: 200
            });
        }
        else{
            return NextResponse.json({
                message: "Some error occured while deleting",
                status: true
            }, {
                status: 400
            });
        }
            
    } catch (error) {
        console.error('Error :', error);
        return NextResponse.json(
            { message: "Internal Server Error", status: false }, 
            { status: 500 }
        );
    }
}