import config from "config";
import mongoose from "mongoose";

const initDbConnection = async () => {
    const dbUrl: string = config.get("database.url");
    console.log("dbUrl", dbUrl);
    await mongoose.connect(dbUrl);
};

export default initDbConnection;
