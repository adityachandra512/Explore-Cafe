import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import menuRoute from './route/menu.route.js';
import userRoutes from "./route/user.route.js";
import feedbackRouter from './route/feedback.js';
// Update this line
import ordersRoute from './route/orders.js';
import razorpayRoutes from './route/razorpay.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MONGODB_URI;

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

// Remove the duplicate import here

// Add this with your other app.use statements
app.use('/api', razorpayRoutes);
app.use('/feedback', feedbackRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
