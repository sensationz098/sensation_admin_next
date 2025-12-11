import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    const ok = mongoose.connection.readyState === 1;
    await mongoose.disconnect();
    return NextResponse.json({ ok, msg: ok ? "Connected" : "Not connected" });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message });
  }
}
