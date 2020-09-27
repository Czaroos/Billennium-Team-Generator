import mongoose, { Schema, Document } from 'mongoose';

export interface UserInterface extends Document {
  name: string;
  skill: string;
  role: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  skill: {
    type: String,
    required: true,
    enum: ['beginner', 'amateur', 'experienced', 'advanced', 'professional'],
  },
  role: {
    type: String,
    required: true,
    enum: ['forward', 'midfield', 'defence', 'goalkeeper'],
  },
});

const User = mongoose.model<UserInterface>('User', UserSchema);

export default User;
