import { Schema, model } from 'mongoose';

const genderSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Gender = model('Genre', genderSchema);
export default Gender;
