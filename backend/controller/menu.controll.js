import Menu from "../model/restaurant.model.js";

export const getMenu = async(req,res) => {
    try {
        const menu = await Menu.find()
        res.status(200).json(menu)
    }
    catch(error) {
        console.log("error",error)
        res.status(500).json(error)
    }
}

export const addMenuItem = async(req,res) => {
    try {
        const newItem = new Menu(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch(error) {
        console.log("error", error);
        res.status(500).json(error);
    }
}

export const deleteMenuItem = async(req,res) => {
    try {
        await Menu.findByIdAndDelete(req.params.id);
        res.status(200).json("Item deleted successfully");
    } catch(error) {
        console.log("error", error);
        res.status(500).json(error);
    }
}

// Make sure updateMenuItem is properly exported
export const updateMenuItem = async(req,res) => {
    try {
        const updatedItem = await Menu.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }
        res.status(200).json(updatedItem);
    } catch(error) {
        console.log("error", error);
        res.status(500).json(error);
    }
}