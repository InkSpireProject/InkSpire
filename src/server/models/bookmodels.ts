import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

if (mongoose.models.Book) {
  delete mongoose.models.Book;
}

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);
export default Book;
