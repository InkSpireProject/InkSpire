import mongoose from 'mongoose'
import { Schema } from 'mongoose';
const cartSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    book:{
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },

},{timestamps:true});

const Cart = mongoose.models.Cart || mongoose.model('Cart',cartSchema);
export default Cart;