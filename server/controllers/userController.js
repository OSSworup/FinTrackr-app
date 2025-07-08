import User from '../models/user.js'
import {generateToken} from '../middlewares/jwt.js'

export async function signup(req,res){
    try{
        const data=req.body;
        console.log(data);
        if(await User.findOne({email:data.email})){
            return res.status(409).json({error:"Email already exists"})
        }

        const newUser=new User(data); 
        const response=await newUser.save();

        const payload={
            id:response.id,
            name:response.name
        }

        const token=generateToken(payload);

        res.status(200).json({token});
        console.log("User Created Successfully");
    }catch(error){
        res.status(500).json({error:"Internal Server error"});
        console.log(error);
    }
}

export async function login(req,res){
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email:email});

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        if (!(await user.comparePassword(password))) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        const payload={
            id:user.id,
            name:user.name
        }

        const token=generateToken(payload);
        res.status(200).json({token});
        
    }catch(error){
        res.status(500).json({Error:"Internal Server error"});
        console.log(error);  
    }
}

export async function profile(req,res){
    try{
       const id=req.user.id;
       const response=await User.findById(id)
       res.status(200).json({message:'Profile',response}); 
    }catch(error){
        res.status(500).json({error:"Internal Server error"});
        console.log(error);  
    }
}