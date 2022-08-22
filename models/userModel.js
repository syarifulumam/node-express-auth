import { DataTypes } from "sequelize";
import db from '../config/database.js'

const User = db.define('users',{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3,100]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    refresh_token: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
},{
    freezeTableName: true
});

export default User;

(async()=>{
    await db.sync();
})();