const { UserModel } = require("../models/user.models");
const { uploadToCloud } = require("../utilis/cloudinary.utilis");

const updateBio = async(req, res) => {
    try{
        const {bio} = req.body;

        const user = await UserModel.findByIdAndUpdate(req.userid, {bio}, {new: true}).select(['_id', 'bio']);

        if(!user) return res.status(500).json({msg: "User bio failed!"})
        res.status(200).json({msg: "Bio update successfully!", user});
    } catch(e) {
        res.send(e);
    }
}

// Used to get User Profile
const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userid).select(['-password']);
        if(!user) return res.status(404).json({msg: "User not found!"});
        res.status(200).json({msg: "User found!", user})
    } catch(e) {
        res.json(e)
    }
};

const getUserById = async(req, res) => {
    try {
        console.log(req.params.userid);
        const user = await UserModel.findById(req.params.userid).select(['-password']); 
        if(!user) return res.status(404).json({msg: "User not found!"});
        res.status(200).json({msg: "User found!", user});
    } catch(e) {
        res.json(e);
    }
};

const updateProfilePicture = async(req, res) => {
    try {
        const {file} = req;
        const url = await uploadToCloud(file.path);
        const user = await UserModel.findByIdAndUpdate(req.userid, {pics: url}, {new: true}).select(['-password']);
        if(!user) return res.status(404).json({msg: "User not found"});
        res.status(200).json({msg: "User Profile Picture Updated!", user});
    } catch(e) {
        res.json(e)
    }
}


module.exports = {updateBio, getMe, getUserById, updateProfilePicture};