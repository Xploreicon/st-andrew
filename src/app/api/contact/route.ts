import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // TODO: Connect to email service (e.g. Resend, Brevo) or a database
    // For now, securely log to console to prove it hit the Next.js API
    console.log("New contact form submission:", data);

    return NextResponse.json({ success: true, message: "Submission logged successfully." }, { status: 200 });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ success: false, message: "Bad Request" }, { status: 400 });
  }
}
