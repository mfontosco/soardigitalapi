import Follower from "../models/follower.cjs"
import { Sequelize } from "sequelize"
import sequelizeConnection from "../src/database/connection.js"

const models = {
    Follower:Follower(sequelizeConnection.Sequelize.DataTypes)
}

const followUser =async(req,res)=>{
    const {followerId} = req.params
    const {mainUserId} =req.body

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
//unfollow user
const unfollowUser =async (req, res)=> {
    const {followerId, mainUserId} =  req.body
    try{
        let unfollowUser = await models.Followers.destroy({
            where: { followerId:followerId,  mainUserId: mainUserId},
        })
        res.status(200).json({
            status: `You just unfolowed post with id ${mainUserId} `,
            unfollowUser
        })
    }catch(err){
        res.status(400).json({
            status: 'Failed',
            error: "Failed to unlike post"
        })
    }
    
}


export {followUser,unfollowUser}