import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    clerkId:{
        type:String,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    score:{
        type:Number,
        required:true,
        default:5
    },
    reports:{
        type:Number,
        required:true,
        default:0
    },
    admin: {
         type: Boolean, 
         default: false },

});

if (mongoose.models.User) {
    delete mongoose.models.User;
}

export const User = mongoose.models.User || mongoose.model('User',userSchema);