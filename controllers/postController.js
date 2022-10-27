import cloudinary  from "cloudinary";
import Post from '../models/post.cjs'
import sequelizeConnection from '../src/database/connection.js'
import { Sequelize } from 'sequelize'


const models ={
  Post : Post(sequelizeConnection, Sequelize.DataTypes),
}


const getAllPost = async (req, res) => {
  try {
    const post = await models.Post.findAll()
    res.status(200).json({
      status: "success",
      post,
    });
  } catch (err) {
    res.json({
      status: "failed",
      error: err.message,
    });
  }
};
const createPost = async (req, res) => {
  const { title, description,userId, isHidden,status} = req.body;
  console.log(req.user)
  try {
    cloudinary.config({
      cloud_name: "mychat",
      api_key: "248311999159469",
      api_secret: "Hfn53Xh4NIbXgGNktmioZ2p1Tiw",
      secure: true,
    });
    const response = await cloudinary.v2.uploader.upload(req.body.thumbnail, {
        resource_type: "image",
        folder: "images",
        height: 400,
        width: 400,
        quality: "auto",
        crop: "scale",
      });
    
    console.log(response)  
    
    const post = await models.Post.create({
      title,
      description,
      thumbnail:response.secure_url,
      imageId:response.public_id,
      userId,
      isHidden,
      status
    });
    res.status(200).json({
      status: "success",
      post,
    });
  } catch (err) {
    console.log(err)
    res.json({
      status: "failed",
      error: err,
    });
  }
};

const getSinglePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await models.Post.findByPk(id);
    res.status(200).json({
      status: "success",
      post,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "failed",
      error: err.message,
    });
  }
};
const editPost = async (req, res) => {
  const { title, description, thumbnail,status} = req.body;
  const { id } = req.params;
  const post = await models.Post.findOne({where:{id: id}});
  try {
    if (title) {
      post.title = title;
    }
    if (description) {
      post.description = description;
    }
    if (thumbnail) {
      post.thumbnail = thumbnail;
    }
    if (status) {
      post.status= status;
    }
    
    post.save();
    res.status(200).json({
      status: "success",
      post,
    });
  } catch (err) {
    res.status(402).json({
      status: "failed",
      error: err.message,
    });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await models.Post.destroy({where: {id: id}})
    res.status(200).json({
      status: "success",
      message: "successfully deleted",
    });
  } catch (err) {
    res.status({
      status: "failed",
      error: err.message,
    });
  }
};

export { getAllPost, createPost, editPost, deletePost, getSinglePost };
