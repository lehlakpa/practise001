import mongoose from "mongoose";
//import { MONGO_NAME } from "../Utils/constants.js";

const connectDb = async () => {
    try {
        const mongooConnect = await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log(`\n mongooDB connected ${mongooConnect.connection.host}`)

    } catch (error) {
        console.log(`MongoDB connection Failed ??`, error)
        process.exit(1)
 
    }
}
export { connectDb };