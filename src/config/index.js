const { Sequelize } = require('sequelize');
const path = __dirname.replace("config", "db")

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: `${path}\\data.sqlite3`
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch(err => {
    console.log("No se conectó a la base de datos");
    console.log(err);
  });

module.exports = sequelize;
