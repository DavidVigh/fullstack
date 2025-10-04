module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "Users",
      timestamps: true,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Post, { foreignKey: "userId", onDelete: "CASCADE" });
  };

  return User;
};
