import Likes from "../models/likes.cjs"
import { Sequelize } from "sequelize"
import sequelizeConnection from "../src/database/connection.js"

const models ={
    Likes:Likes(sequelizeConnection,Sequelize.DataTypes)
}

//like a post (post request)
const likePost = async (req, res)=> {
    const {postid, userid} =  req.body
    console.log(req.body, "req.query from likes")
    try{
        let likedPost = await models.Likes.create({
            postId: postid,
            userId: userid
        })
        res.status(200).json({
            status: `You just liked a post `,
            likedPost
        })
    }catch(err){
        res.status(400).json({
            status: 'Failed',
            error: "Failed to like post"
        })
    }
    
}


// unlike post (post)

const unlikePost = async (req, res)=> {
    const {postId, userId} =  req.body

    try{
        let unlikedPost = await models.Likes.destroy({
            where: { postId: postId, userId: userId },
        })
        res.status(200).json({
            status: `You just unliked a post  `,
            unlikedPost
        })
    }catch(err){
        res.status(400).json({
            status: 'Failed',
            error: "Failed to unlike post"
        })
    }
    
}

export {unlikePost,likePost}