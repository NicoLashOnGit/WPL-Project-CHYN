import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  displayName: String,
  country: String,
  favorites: { type: Array, default: [] },
});

export default mongoose.model('User', userSchema);


