import mongoose from "mongoose";
const menuSchema=mongoose.Schema({
    name:String,
    price:String,
    category:String,
    image:String,
    title:String,
})
const Menu=mongoose.model("Menu",menuSchema);

export default Menu;