const { MongoClient } = require("mongodb");

const mongoUrl =
  "mongodb://root:password@mongodb:27017/repairmate?authSource=admin";

const connectMongo = async () => {
  try {
    const client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    const db = client.db();
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = { connectMongo };
