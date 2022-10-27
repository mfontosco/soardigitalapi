import Sequelize from 'sequelize'

const sequelizeConnection = new Sequelize('soardigital', 'root', '', {host: 'localhost', dialect: 'mysql', port:3306,operatorAliases: false,});

export default sequelizeConnection;

global.sequelize = sequelizeConnection