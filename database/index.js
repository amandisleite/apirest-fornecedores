const Sequelize = require('sequelize')
const config = require('config')

const database = new Sequelize(
  config.get('mysql.banco'),
  config.get('mysql.usuario'),
  config.get('mysql.senha'),
  {
    host: config.get('mysql.host'),
    dialect: 'mysql'
  }
)

module.exports = database
