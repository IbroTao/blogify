const { hashSync, compareSync } = require("bcryptjs");
const { UserModel } = require("../models/user.models");
const { sign } = require("jsonwebtoken");
require("dotenv").config({});

const SECRET = process.env.SECRET;

const registerUser = async (req, res) => {
    try{
        const {name, email, password,} = req.body;

        const user = await UserModel.findOne({email});

        if(user) return res.status(400).json({msg: "Existing email, try using a new email"});


        await UserModel.create({name, email, password: hashSync(password, 11)});

        res.status(201).json({msg: "User created!"});
    } catch(e) {
        res.send(e);
    }
};

const createJWT = (userid) => {
    return sign({
        sub: userid,
        exp: 300000
    }, SECRET)
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await UserModel.findOne({email});
        
        if(!user) return res.status(400).json({msg: "This user does not exist"});

        const isPasswordCorrect = compareSync(password, user.password);

        if(!isPasswordCorrect) return res.status(401).json({msg: "Wrong Password!"});

        // select removes 
        const jwtToken = createJWT(user._id)

        const returnUser = await UserModel.findById(user._id).select(['-password']);

        res.status(200).json({
            user: returnUser,
            token: jwtToken,
            msg: "Login successfully!"
        })
            
    } catch(e) {
        res.send(e)
    }
}

module.exports = {registerUser, loginUser};