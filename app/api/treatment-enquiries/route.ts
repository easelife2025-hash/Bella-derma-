import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Basic validation
    if (!data.name || !data.phone || !data.treatmentId || !data.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const enquiry = {
      name: data.name,
      phone: data.phone,
      treatmentId: data.treatmentId,
      message: data.message,
      status: "new",
      createdAt: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, "treatmentEnquiries"), enquiry);

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("Error creating treatment enquiry:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
