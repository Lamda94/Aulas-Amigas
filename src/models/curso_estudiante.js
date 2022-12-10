'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class curso_estudiante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  curso_estudiante.init({
    curso_id: DataTypes.BIGINT,
    estudiante_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'curso_estudiante',
  });
  return curso_estudiante;
};