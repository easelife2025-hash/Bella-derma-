import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Basic validation
    if (!data.name || !data.email || !data.phone || !data.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const enquiry = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      status: "new",
      createdAt: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, "contactEnquiries"), enquiry);

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("Error creating contact enquiry:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
