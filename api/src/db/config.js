require("dotenv").config();

module.exports = {

  development: {
    database: "artesia-db",
    use_env_variable: "DATABASE_DEV_URL",
    dialect: "mysql",
  },
  production: {
    database: "artesia-db",
    use_env_variable: "DATABASE_URL",
    dialect: "mysql",
    dialectOptions:{
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  },
}
