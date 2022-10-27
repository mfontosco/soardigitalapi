import Comments from "../models/comments.cjs"
import { Sequelize } from "sequelize"
import sequelizeConnection from "../src/database/connection.js"

const models = {
    Comments:Comments(sequelizeConnection.Sequelize.DataTypes)
}

const createComments =async(req,res)=>{
    const {id} =req.params

    try{
                let createPost = await models.Comments.create({
                    postid: id,
                    userid,
                })
                res.status(200).json({
                    status:"success",
                    createPost
                })
            }catch(err){
                console.log(err)
            }
}

const UnComment =async(req,res)=>{
    const {id} =req.params

    try{
                let createPost = await models.Comments.create({
                    postid: id,
                    userid,
                })
                res.status(200).json({
                    status:"success",
                    createPost
                })
            }catch(err){
                console.log(err)
            }
}

export {createComments}