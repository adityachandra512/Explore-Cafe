import Menu from "../model/restaurant.model.js";

export const getMenu=async(req,res)=>{
    try{
        const menu=await Menu.find()
        res.status(200).json(menu)
    }
    catch(error){
        console.log("error",error)
        res.status(500).json(error)
    }
}