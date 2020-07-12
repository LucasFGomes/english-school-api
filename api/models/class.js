"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Class.hasMany(models.Registration, { foreignKey: "class_id" });
      Class.belongsTo(models.Person, { foreignKey: "teacher_id" });
      Class.belongsTo(models.Level, { foreignKey: "level_id" });
    }
  }
  Class.init(
    {
      date_initial: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Class",
    }
  );
  return Class;
};
