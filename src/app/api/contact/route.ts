import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      // Fallback: log to console if no API key yet
      console.log("New project inquiry:", data);
      return NextResponse.json({ success: true, message: "Received (email not configured yet)" });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <noreply@resend.dev>",
        to: process.env.CONTACT_EMAIL || "hello@example.com",
        subject: `New Project Inquiry from ${data.name}`,
        html: `
          <h2>New Project Inquiry</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Project Type:</strong> ${data.projectType}</p>
          <p><strong>Budget:</strong> ${data.budget}</p>
          <p><strong>Details:</strong> ${data.details}</p>
        `,
      }),
    });

    if (!res.ok) {
      console.error("Resend API error:", await res.text());
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
