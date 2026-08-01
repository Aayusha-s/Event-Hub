import mongoose, { ConnectOptions } from "mongoose";
import bcrypt from "bcryptjs";
import User from "@/models/User";

type MongooseCache = {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

export async function dbConnect(): Promise<mongoose.Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Missing MONGODB_URI. Please add it to .env.local.");
  }

  if (!cached.promise) {
    const options: ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(uri, options);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  await Promise.all([
    User.updateOne({ email: "admin@vivnt.com" }, { $setOnInsert: { name: "Vivnt Administrator", email: "admin@vivnt.com", password: await bcrypt.hash("Admin@123", 12), role: "admin", interests: [] } }, { upsert: true }),
    User.updateOne({ email: "checker@vivnt.com" }, { $setOnInsert: { name: "Vivnt Ticket Checker", email: "checker@vivnt.com", password: await bcrypt.hash("Checker@123", 12), role: "ticket_checker", interests: [] } }, { upsert: true }),
  ]);
  return cached.conn;
}

export default dbConnect;
