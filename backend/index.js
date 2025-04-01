import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import menuRoute from './route/menu.route.js';
import userRoutes from "./route/user.route.js";
import feedbackRouter from './route/feedback.js';
// Update this line
import ordersRoute from './route/orders.js';

const app = express();
dotenv.config();

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
app.use("/users", userRoutes);
app.use('/orders', ordersRoute);

// Add feedback route
app.use('/feedback', feedbackRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
