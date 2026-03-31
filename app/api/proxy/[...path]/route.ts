import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ path: string[] }> }
) {
    const { path } = await context.params;
    const imagePath = path.join('/');

    if (!imagePath.startsWith('preview/') && !imagePath.startsWith('sample/') && !imagePath.startsWith('posts/')) {
        return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    const sourceUrl = `https://www.sakugabooru.com/data/${imagePath}`;

    try {
        const response = await fetch(sourceUrl, {
            headers: {
                'User-Agent': 'Sakugaa/1.0 (https://sakugaa.com)',
            },
        });

        if (!response.ok) {
            return new NextResponse('Not found', { status: 404 });
        }

        const contentType = response.headers.get('content-type') || 'image/jpeg';

        return new NextResponse(response.body, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=2592000, stale-while-revalidate=86400, immutable',
                'CDN-Cache-Control': 'public, max-age=2592000',
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (error) {
        console.error('Proxy fetch error:', error);
        return new NextResponse('Fetch failed', { status: 502 });
    }
}