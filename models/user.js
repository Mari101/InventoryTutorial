import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const User = mongoose.model('User', UserSchema, 'users');

export default User;
