import mongoose from 'mongoose'
import { Schema } from 'mongoose';
const rentSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    book:{
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    duration:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    isReturned:{
        type:Boolean,
        default:false
    }

},{timestamps:true});

if (mongoose.models.Rent) {
    delete mongoose.models.Rent;
}

const Rent = mongoose.models.Rent || mongoose.model('Rent',rentSchema);
export default Rent;