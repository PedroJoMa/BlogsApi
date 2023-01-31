const BlogPostModel = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
    user_id: {type: DataTypes.INTEGER, foreignKey: true},
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User,
      {foreignKey: 'user_id'})};
  
  return BlogPost;
};

module.exports = BlogPostModel;