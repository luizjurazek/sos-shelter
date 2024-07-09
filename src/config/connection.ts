import { Dialect, Sequelize } from "sequelize";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const DB_USER: string = process.env.DB_USER || "";
const DB_PASSWORD: string = process.env.DB_PASSWORD || "";
const DB_HOST: string = process.env.DB_HOST || "";
const DB_NAME: string = process.env.DB_NAME || "";
const DB_DIALECT: Dialect = process.env.DB_DIALECT as Dialect;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: DB_DIALECT,
  host: DB_HOST,
});

// Sync datase when start application
// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("Database synced");
//   })
//   .catch((error) => {
//     console.log("Has an erro while sync database: ", error);
//   });

export { sequelize };
