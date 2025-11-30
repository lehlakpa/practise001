import dotenv from "dotenv";
dotenv.config({
    path: './.env'
});
import { connectDb } from "./Db/database.js";
import app from "./app.js";

connectDb()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to the database:", error);
    });