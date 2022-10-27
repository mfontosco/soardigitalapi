import User from '../models/user.cjs'
import bcrypt from 'bcrypt'
import generateToken from '../utils/generateToken.js'
import Token from '../models/TokenModel.js'
import crypto from 'crypto'
import sequelizeConnection from '../src/database/connection.js'
import { Sequelize } from 'sequelize'



const models ={
    User : User(sequelizeConnection, Sequelize.DataTypes),
}
const signUp =async(req,res)=>{
    console.log("user",User)
    const {name,email,password,address,interest,status} =req.body
    try{
        const userExist = await models.User.findOne({ where: { email: email} })
    if(userExist){
        throw Error("User already exist,pls login")
    }
    let hashedpassword = await bcrypt.hash(password,10)
        const user = await models.User.create({
            name,
            email,
            password:hashedpassword,
            address,
            interest,
            status
        })
        res.json({
            status:"success",
            user:{
                id:user._id,
                email,
            }
        })
       }catch(err){
    console.log(err)
    res.json({
        status:"failed",
        error:err.message
    })
       }
}

const loginUser = async(req,res)=>{
    const {email,password} = req.body
    try{
        const user = await models.User.findOne({ where: { email: email } })
  console.log(user)
        if(!user){
            throw new Error("User does not exist,please register")
        }
        if(user && (await bcrypt.compare(password,user.password))){
            console.log(user._id)
            res.status(200).json({
                status:"success",
                user:{
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    address:user.address,
                    interest:user.interest,
                    status:user.status,
                    token:await generateToken(user._id)
                }
            })
        }else{
            res.status(402)
            throw new Error("Incorrect password")
        }
    }catch(err){
        console.log(err)
        res.status(400).json({
            status:"failed",
            error:err.message,
        })
    }

}

//  recoverAccount
const deactivatedAccount = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email: email } });
  
    if (!user) {
      res.status(404);
      throw new Error("User does not exist");
    }
  
    // Delete token if it exists in DB
    let token = await Token.findOne({ userId: user._id });
    if (token) {
      await token.destroy();
    }
  
    // Create Reste Token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    console.log(resetToken);
  
    // Hash token before saving to DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    // Save Token to DB
    await new Token({
      userId: user._id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 30 * (60 * 1000), // Thirty minutes
    }).save();
  
    // Construct Reset Url
    const resetUrl = `${process.env.FRONTEND_URL}/resetAccount/${resetToken}`;
  
    // Reset Email
    const message = `
        <h2>Hello ${user.name}</h2>
        <p>Please use the url below to reset your password</p>  
        <p>This reset link is valid for only 30minutes.</p>
  
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
  
        <p>Regards...</p>
        <p>Pinvent Team</p>
      `;
    const subject = "Account Reset Request";
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER;
  
    try {
      await sendEmail(subject, message, send_to, sent_from);
      res.status(200).json({ success: true, message: "Reset Email Sent" });
    } catch (error) {
      res.status(500);
      throw new Error("Email not sent, please try again");
    }
  };
  
  // Reset Password
  const recoverAccount = async (req, res) => {
    const { password } = req.body;
    const { resetToken } = req.params;
  
    // Hash token, then compare to Token in DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    // fIND tOKEN in DB
    const userToken = await Token.findOne({where:{
      token: hashedToken,
      expiresAt: { $gt: Date.now() },}
    });
  
    if (!userToken) {
      res.status(404);
      throw new Error("Invalid or Expired Token");
    }
  
    // Find user
    const user = await User.findOne({where:{ _id: userToken.userId }});
    user.password = password;
    user.status="active"
    await user.save();
    res.status(200).json({
      message: "Account Reset Successful, Please Login",
    });
  };
  


export {signUp,loginUser,recoverAccount,deactivatedAccount}