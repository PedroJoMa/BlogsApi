const PostCategoryModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    post_id: {type: DataTypes.INTEGER, foreignKey: true},
    category_id: {type: DataTypes.INTEGER, foreignKey:true},
  });

  PostCategory.associate = (models) => {
    PostCategory.belongsToMany(models.Category,{
      through: PostCategory,
      foreignKey: 'category_id',
      otherKey: 'post_id',
    });
    PostCategory.belongsToMany(models.BlogPost,{
      through: PostCategory,
      foreignKey: 'post_id',
      otherKey: 'category_id',
    });
  };

  return PostCategory;
};

module.exports = PostCategoryModel;