// models/PostTag.js
module.exports = (sequelize, DataTypes) => {
  const PostTag = sequelize.define(
    "PostTag",
    {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Posts",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Tags",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "PostTags",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["postId", "tagId"], // composite unique index to avoid duplicates
        },
      ],
    }
  );

  return PostTag;
};
