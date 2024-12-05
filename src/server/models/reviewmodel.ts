import mongoose, { Document, Schema } from 'mongoose';

interface IReview extends Document {
  bookId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  rating: number;
  reviewText?: string;
  createdAt: Date;
  // updatedAt?: Date;
}

const reviewSchema = new Schema<IReview>({
  bookId: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  reviewText: {
    type: String,
    maxlength: 1000,
  },
  createdAt:{
    type: Date,
    default: Date.now()
  }
});

const Review = mongoose.models.Review || mongoose.model<IReview>('Review', reviewSchema);
export default Review;