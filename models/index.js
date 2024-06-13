// import dbConfig
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize_config = new Sequelize(
    dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        pool:{
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        }
     }
);
const db ={};
db.Sequelize = Sequelize;
db.sequelize_config =sequelize_config;

db.students = require("./student.model.js")(sequelize_config, Sequelize);
db.staff = require("./staff.model.js")(sequelize_config, Sequelize);
db.fainance =require("./finance.model.js")(sequelize_config,Sequelize);

db.students.hasOne(db.fainance, {foreignKey: `student_id`});

module.exports =db;