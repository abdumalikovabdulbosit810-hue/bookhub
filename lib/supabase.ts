import { createClient } from "@supabase/supabase-js";
import { OrderPayload } from "@/lib/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export async function createOrder(payload: OrderPayload) {
  if (!supabase) {
    const localOrders = JSON.parse(globalThis.localStorage?.getItem("kitob-orders") || "[]");
    const order = { id: crypto.randomUUID(), created_at: new Date().toISOString(), ...payload };
    globalThis.localStorage?.setItem("kitob-orders", JSON.stringify([order, ...localOrders]));
    return order;
  }

  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      full_name: payload.fullName,
      phone: payload.phone,
      region: payload.region,
      district: payload.district,
      address: payload.address,
      notes: payload.notes,
      total: payload.total,
      coupon_code: payload.coupon,
      status: "new"
    })
    .select()
    .single();

  if (error) throw error;

  const { error: itemsError } = await supabase.from("order_items").insert(
    payload.items.map((item) => ({
      order_id: order.id,
      book_id: item.book.id,
      title: item.book.title,
      quantity: item.quantity,
      price: item.book.discountPrice
    }))
  );
  if (itemsError) throw itemsError;
  return order;
}
