import mongoose from 'mongoose';
import dotenv from 'dotenv';
import posters from './Data/poster.js';
import Poster from './Model/poster.model.js';
import connectDB from './Configs/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Poster.deleteMany(); // Clear existing data so you don't have duplicates

    await Poster.insertMany(posters);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Poster.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

// Check command line arguments to decide whether to import or destroy
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}