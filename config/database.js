import sequelize from "sequelize";
import config from './config.js'

const db = new sequelize(config.dbName,config.dbUser,config.dbPass,{
    host: config.dbHost,
    dialect: "mysql"
})

export default db