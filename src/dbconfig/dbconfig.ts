import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("open", () => {
      console.log("MONGODB is successfully connected");
    });

    connection.on("error", (err) => {
      console.log("something went wrong in connecting to MONGODB", err);
      process.exit(1);
    });
  } catch (error: any) {
    throw new Error("something went wrong in connecting", error.message);
  }
}
