import mongoose from mongoose;
import userModel from "../models/userSchema.js";
import bcrypt from 'bcryptjs';

const register = async (req,res)=>{
    try {
        const { name, email, password } = req.body
        
        if( name || email || password ){
            return res.status(401).json({success:false , massage : ' All Fields Requires '})
        }
        
        const existingUser = await userModel.findOne({email})
        
        if(existingUser){
            return res.status(401).json({ success : false ,massage : "User already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash( password , salt )

        const newUser = new userModel(
            {
                name,
                email,
                password: hashedPassword
            }
        )

        await newUser.save()
        const token = jwt.sign({id: newUser._id ,email: newUser.email},password.env.JWT_SECRET,{expriesIn:"7d"})

        res.cookie(token,{
            httpOnly:false,
            secure:false,
            sameSite:'Lax',
            maxAge:7*24*60*60*1000
        })

        const userResponse = {
            id:newUser._id,
            name:newUser.name,
            email:newUser.email
        }

        res.status(200).json({success:true,message:"user Registered successfully", user: userResponse})

    } catch (error) {
        res.status(500).json( { success : false , message : "Internal Server Error" })
    }
}