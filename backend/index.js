import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import menuRoute from "./route/menu.route.js";
import userRouter from "./route/user.route.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 4000;
const URI = process.env.MONGODB_URI; // Ensure the environment variable name matches your .env file

app.use(cors());
app.use(express.json());

// Connection with MongoDB database
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

// Defining routes
app.use("/menu", menuRoute);
app.use("/user", userRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
