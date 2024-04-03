import { Schema, model } from 'mongoose';

const domainSchema = new Schema({
  domain: {
    type: String,
    required: true,
    unique: true,
  },
});

const Domain = model('Domain', domainSchema);

export default Domain;
