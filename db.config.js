const Sequelize = require("sequelize");
const dbName = "express_sequilize";
const dbUser = "root";
const dbPassword = "";

const sequelize = new Sequelize(dbName, dbUser, dbPassword,{
    'host': 'localhost',
    'port': 3306,
    'dialect': 'mysql',
});
const  db ={};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Model-tabels
db.customer = require("./customer.model")(sequelize, Sequelize);

module.exports = db;