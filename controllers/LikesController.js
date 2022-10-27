import Likes from "../models/likes.cjs"
import { Sequelize } from "sequelize"
import sequelizeConnection from "../src/database/connection.js"

const models ={
    Likes:Likes(sequelizeConnection,Sequelize.DataTypes)
}

const createLikes =async(req,res)=>{
    const {id} =req.params
    const {userId} =req.body

    try{
                let createLike = await models.Likes.create({
                    postid: id,
                    userId,
                })
                res.status(200).json({
                    status:"success",
                    createLike
                })
            }catch(err){
                console.log(err)
            }
}

const UnLike =async(req,res)=>{
    const {id} =req.params

    try{
                let createLike = await models.Post.destroy({where:{userId:userId}})
                res.status(200).json({
                    status:"success",
                    createLike
                })
            }catch(err){
                console.log(err)
            }
}

export {createLikes}