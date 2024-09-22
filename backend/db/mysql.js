const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("repairmate", "root", "root", {
  host: "mysqldb",
  dialect: "mysql",
  port: 3306,
});

const connectWithRetry = async () => {
  let retries = 5; // Number of retries
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log("Database connection established successfully.");
      return; // Exit the loop on success
    } catch (err) {
      console.error("Database connection error:", err);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      await new Promise((res) => setTimeout(res, 5000)); // Wait 5 seconds before retrying
    }
  }
  throw new Error("Failed to connect to the database after several attempts.");
};

const synchronizeDatabase = async () => {
  await connectWithRetry(); // Ensure connection before synchronizing
  try {
    const databaseExists = await sequelize.query(
      `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'repairmate'`
    );

    if (databaseExists[0].length === 0) {
      await sequelize.query("CREATE DATABASE IF NOT EXISTS repairmate;");
      console.log("Database 'repairmate' created");
    }

    await sequelize.sync({ force: false });
    console.log("Database synchronized");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};

synchronizeDatabase();

module.exports = sequelize;
