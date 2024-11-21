import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`CONNECT TO Mongodb ${connect.connection.host}`);
  } catch (error) {
    console.log(`error in mogoDB ${error}`);
  }
};

export default connectDB;