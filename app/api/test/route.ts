import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ message: "Database connected successfully! 🚀" }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    // This line prints the REAL MongoDB error in your VS Code terminal!
    console.error("=== MONGODB ERROR DETECTED ===");
    console.error(errorMessage);
    console.error("==============================");
    
    return NextResponse.json({ error: "Failed to connect to database", details: errorMessage }, { status: 500 });
  }
}