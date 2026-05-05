import { NextRequest, NextResponse } from "next/server";

function isAllowedAssetHost(urlString: string): boolean {
  try {
    const { hostname } = new URL(urlString);
    return (
      hostname.endsWith("r2.dev") ||
      hostname.includes("cloudflarestorage.com") ||
      hostname.endsWith("supabase.co")
    );
  } catch {
    return false;
  }
}

function inferAssetHeaders(urlString: string, filename: string): { contentType: string; accept: string } {
  const path = (urlString.split("?")[0] || "").toLowerCase();
  const name = filename.toLowerCase();
  const ext =
    (name.includes(".") ? name.split(".").pop() : null) ||
    (path.includes(".") ? path.split(".").pop() : null) ||
    "";

  switch (ext) {
    case "pdf":
      return { contentType: "application/pdf", accept: "application/pdf,*/*" };
    case "jpg":
    case "jpeg":
      return { contentType: "image/jpeg", accept: "image/*,*/*" };
    case "png":
      return { contentType: "image/png", accept: "image/*,*/*" };
    case "gif":
      return { contentType: "image/gif", accept: "image/*,*/*" };
    case "webp":
      return { contentType: "image/webp", accept: "image/*,*/*" };
    case "avif":
      return { contentType: "image/avif", accept: "image/*,*/*" };
    case "svg":
      return { contentType: "image/svg+xml", accept: "image/*,*/*" };
    default:
      return { contentType: "application/octet-stream", accept: "*/*" };
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get("url");
    const filename = searchParams.get("filename") || "download";

    if (!url) {
      return NextResponse.json({ error: "URL parameter is required" }, { status: 400 });
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    if (!isAllowedAssetHost(url)) {
      return NextResponse.json({ error: "Invalid URL source" }, { status: 400 });
    }

    const { contentType, accept } = inferAssetHeaders(url, filename);

    const response = await fetch(url, {
      headers: {
        Accept: accept,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch asset" }, { status: response.status });
    }

    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename.replace(/"/g, "")}"`,
        "Content-Length": buffer.byteLength.toString(),
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Asset proxy error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
