const { UserModel } = require("../models/user.models");

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

const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userid).select(['-password']);
        if(!user) return res.status(404).json({msg: "User not found!"});
        res.status(200).json({msg: "User found!", user})
    } catch(e) {
        res.json(e)
    }
}

module.exports = {updateBio, getMe};