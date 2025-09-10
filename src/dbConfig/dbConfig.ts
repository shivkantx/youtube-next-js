import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected succesfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection failed, please make sure mongodb is running." + err
      );
      process.exit();
    });

    connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });
  } catch (error) {
    console.log("something wennt wrong");
    console.log(error);
  }
}
