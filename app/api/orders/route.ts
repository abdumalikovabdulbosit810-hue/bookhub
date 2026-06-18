import { NextResponse } from "next/server";
import { createOrder } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const order = await createOrder(payload);
    return NextResponse.json({ order });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Order failed" }, { status: 500 });
  }
}
