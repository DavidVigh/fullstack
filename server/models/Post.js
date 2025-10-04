module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, { foreignKey: "userId", onDelete: "CASCADE" });
    Post.belongsToMany(models.Tag, {
      through: models.PostTag,
      foreignKey: "postId",
    });
  };

  return Post;
};
