import  sequelizeconnection from '../src/database/connection.js';
import Sequelize from 'sequelize';

const {DataTypes} =Sequelize

const Token = sequelizeconnection.define('Token', {
  // Model attributes are defined here
  userId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  Token: {
    type: DataTypes.STRING,
    allowNull:false
    // allowNull defaults to true
  }
  ,
  createdAt:{
    type:DataTypes.DATE
  },
  expiresAt:{
    type:DataTypes.DATE
  }
 
}, {
  // Other model options go here
  freezeTableName: true
});

Token.sync().then((data)=>{
    console.log("synced token")
         }).catch((error)=>{
        console.log(error)
         });
export default Token