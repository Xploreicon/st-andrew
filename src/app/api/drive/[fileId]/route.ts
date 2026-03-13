import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const { fileId } = await params;

    if (!fileId) {
      return NextResponse.json({ error: "File ID is required" }, { status: 400 });
    }

    const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    // Initial fetch
    let response = await fetch(driveUrl);

    // Google Drive often redirects to a "cannot scan for viruses" page for large files
    // We need to parse the confirm token and fetch again if that happens
    const text = await response.clone().text();
    if (text.includes("confirm=")) {
      const match = text.match(/confirm=([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        const confirmToken = match[1];
        response = await fetch(`${driveUrl}&confirm=${confirmToken}`);
      }
    }

    if (!response.ok) {
      console.error("Drive API failed:", response.status, response.statusText);
      return NextResponse.json(
        { error: "Failed to fetch file from Drive" },
        { status: response.status }
      );
    }

    // Determine content type from Google's response or default to octet-stream
    const contentType = response.headers.get("content-type") || "application/octet-stream";

    // Set up headers for caching (24 hours) and passing the stream
    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Cache-Control", "public, max-age=86400, stale-while-revalidate=43200");
    
    // Add content disposition if available to hint at the original filename
    const contentDisposition = response.headers.get("content-disposition");
    if (contentDisposition) {
      headers.set("Content-Disposition", contentDisposition);
    }

    // Stream the buffer back to the client
    return new NextResponse(response.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error proxying Drive file:", error);
    return NextResponse.json(
      { error: "Internal server error proxies drive file" },
      { status: 500 }
    );
  }
}
