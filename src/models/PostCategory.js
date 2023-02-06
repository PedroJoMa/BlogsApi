const PostCategoryModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',
  {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      references: { 
        model: 'blog_posts',
         key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      references: { 
       model: 'categories',
       key: 'id'
      }
    },
  },
  {
    tableName: 'posts_categories',
    timestamps: false,
    underscored: true,
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      as: 'categories',
      foreignKey: 'post_id',
      otherKey: 'category_id'
    });

    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      as: 'blog_posts',
      foreignKey: 'category_id',
      otherKey: 'post_id'
    });
  }

  return PostCategory;

}

module.exports = PostCategoryModel;