const PostCategoryModel = require("./PostCategory");

const CategoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'categories',
  }
  );

  Category.associate = (models) => {
    Category.hasMany(models.PostCategory, 
      {foreignKey: 'categoryId', as: 'posts_categories'}
  )}

  return Category;
};

module.exports = CategoryModel;