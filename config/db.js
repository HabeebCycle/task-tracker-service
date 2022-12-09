import mongoose from "mongoose";

const dbConfig = () =>
  mongoose
    .connect(process.env.DB_URL)
    .then((con) =>
      console.log(`Connected to MongoDb cluster via ${con.connection.host}`)
    )
    .catch((err) =>
      console.error(`Unable to connect to MongoDb cluster ${err.message}`)
    );

export default dbConfig;
