import Follower from "../models/follower.cjs"
import { Sequelize } from "sequelize"
import sequelizeConnection from "../src/database/connection.js"

const models = {
    Follower:Follower(sequelizeConnection.Sequelize.DataTypes)
}

const createFollower =async(req,res)=>{
    const {followerId} = req.params

    try{
                let follow = await models.Follower.create({
                    mainUserId,
                    followerId
                })
                res.status(200).json({
                    status:"success",
                    follow
                })
            }catch(err){
                console.log(err)
            }
}

const UnComment =async(req,res)=>{
    const {id} =req.params

    try{
                let createPost = await models.Follower.destroy({
                    where:{userid:userid}
                })
                res.status(200).json({
                    status:"success",
                    createPost
                })
            }catch(err){
                console.log(err)
            }
}

export {createFollower}