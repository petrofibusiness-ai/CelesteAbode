import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get('url');
    const filename = searchParams.get('filename') || 'brochure.pdf';

    if (!url) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      );
    }

    // Validate that the URL is from R2 (security check)
    if (!url.includes('r2.dev') && !url.includes('cloudflarestorage.com')) {
      return NextResponse.json(
        { error: 'Invalid URL source' },
        { status: 400 }
      );
    }

    // Fetch the PDF from R2
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/pdf',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch PDF' },
        { status: response.status }
      );
    }

    // Get the PDF as a buffer
    const buffer = await response.arrayBuffer();

    // Return the PDF with proper headers for download
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': buffer.byteLength.toString(),
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('PDF proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

