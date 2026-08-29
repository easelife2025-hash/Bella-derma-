import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Basic validation
    if (!data.name || !data.phone || !data.preferredDate || !data.preferredTime || !data.treatment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const appointment = {
      name: data.name,
      phone: data.phone,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      treatment: data.treatment,
      message: data.message || "",
      status: "pending",
      createdAt: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, "appointments"), appointment);

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
