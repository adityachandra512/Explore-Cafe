import User from "../model/user.model.js";
import bcryptjs from "bcryptjs"
export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword= await bcryptjs.hash(password,10)
    const createUser = new User({
      fullname:fullname,
      email:email,
      password:hashPassword,
    });
    
    await createUser.save();
    res.status(201).json({ message: "User created successfully",user:{
        _id:createUser._id,
        fullname:createUser.fullname,
        email:createUser.email,
    } });
  } catch (error) {
    console.log("error: " + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const login=async(req,res)=>{
    try {
        const{email,password}=req.body;
        const user=await User.findOne({email});
        const isMatch=await bcryptjs.compare(password,user.password)
        if(!user||!isMatch){
            return res.status(400).json({message:"Invalid username or password"});
        }
        else{
            res.status(200).json({message:"login successful",user:{
                _id:user.id,
                fullname:user.fullname,
                email:user.email
            }})
        }
    } catch (error) {
        console.log("Error"+error.message)
    }
}

// Add this new function to get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }); // Exclude password field
        res.status(200).json(users);
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Error fetching users" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullname, email } = req.body;
        
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { fullname, email },
            { new: true, select: '-password' }
        );
        
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Error updating user" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Error deleting user" });
    }
};
