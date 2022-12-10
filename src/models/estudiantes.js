'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estudiantes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Estudiantes.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    grado: DataTypes.INTEGER,
    grupo: DataTypes.STRING,
    correo: DataTypes.STRING,
    ubicacion: DataTypes.STRING,
    estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Estudiantes',
  });
  return Estudiantes;
};