'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Likes.belongsTo(models.Post)
      models.Post.hasMany(models.Likes)
    }
  }
  Likes.init({
    userId: DataTypes.STRING,
    postId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Likes',
  });
  return Likes;
};