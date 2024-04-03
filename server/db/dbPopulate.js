import { data } from '../data.js';
import User from '../src/models/User.js';
import Gender from '../src/models/Gender.js';
import Domain from '../src/models/Domain.js';
import dbConnect from './dbConnect.js';
import dotenv from 'dotenv';

dotenv.config();
const db = await dbConnect();

const populateModel = async (Model, fieldExtractor, fieldName) => {
  try {
    if (!Array.isArray(data)) {
      throw new Error('Data is not an array');
    }
    const documents = [...fieldExtractor].map((field) => {
      return { [fieldName]: field };
    });
    await Model.insertMany(documents);
  } catch (error) {
    console.error(`${Model.modelName} population error:`, error);
    console.log('UNCAUGHT DB EXCEPTION  Shutting down...');
    process.exit(1);
  }
};

const populateUser = async () => {
  try {
    if (!Array.isArray(data)) {
      throw new Error('Data is not an array');
    }
    await User.insertMany(data);
  } catch (error) {
    console.error('User population error:', error);
    console.log('UNCAUGHT DB EXCEPTION  Shutting down...');
    process.exit(1);
  }
};

const populateDB = async () => {
  try {
    await Promise.all([
      populateUser(),
      populateModel(Gender, new Set(data.map((user) => user.gender)), 'name'),
      populateModel(Domain, new Set(data.map((user) => user.domain)), 'domain'),
    ]);
    console.log('DB populated successfully ');
  } catch (error) {
    console.error('DB population error:', error);
    console.log('Error in populating DB  Shutting down...');
    process.exit(1);
  }
};

const deleteDB = async () => {
  try {
    await Promise.all([
      User.deleteMany({}),
      Gender.deleteMany({}),
      Domain.deleteMany({}),
    ]);
    console.log('DB deleted successfully ');
  } catch (error) {
    console.error('DB deletion error:', error);
    console.log('Error in deleting DB  Shutting down...');
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  await populateDB();
} else if (process.argv[2] === '-d') {
  await deleteDB();
}
