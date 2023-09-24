const { PostModel } = require("../models/post.models");
const { uploadToCloud } = require("../utilis/cloudinary.utilis");

const createPost = async(req, res) => {
    try {
        const {body, file} = req;
        const url = await uploadToCloud(file.path);

        const post = await PostModel.create({content: body.content, desc: body.description, title: body.title, img: url, userId: req.userid}); 
        res.status(201).json({msg: "Post blog created", post})
    } catch(e) {
        res.json(e)
    }
};

module.exports = {createPost};