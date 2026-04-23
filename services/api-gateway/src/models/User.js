import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    lowercase:true,
    trim:true,
    unique: true,
    match: /^\S+@\S+\.\S+$/
  },
  password: {
    type:String,
    required:true,
    minlength:3,
    maxlength:9
  },
});

export default mongoose.model("User", userSchema);