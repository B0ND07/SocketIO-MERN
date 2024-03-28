import User from "../models/userModel";

export const getUsers=async(req,res)=>{
    try {
        const allusers=await User.find().select("-password")
        res.status(200).json(allusers)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error", error });
    }
}