import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors"
import menuRoute from "./route/menu.route.js"
import userRouter from "./route/user.route.js"
const app = express();
app.use(cors());
app.use(express.json())
dotenv.config();
const PORT=process.env.PORT || 4000;
const URI=process.env.MongoDBURI;
// connection with mongodb database
try{
    mongoose.connect(URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
});
console.log("connected to mongodb")
}catch(error){
console.log("Error:",error)
}

// defineing routes
app.use("/menu",menuRoute);
app.use("/user",userRouter);
app.listen(PORT, () => {
  console.log(`server is  listening on port ${PORT}`)
})