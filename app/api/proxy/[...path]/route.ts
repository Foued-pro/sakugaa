import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ path: string[] }> }
) {
    const { path } = await context.params;
    const imagePath = path.join('/');

    const isAllowed =
        imagePath.startsWith('preview/') ||
        imagePath.startsWith('sample/') ||
        imagePath.startsWith('posts/') ||
        /^[a-f0-9]+\.(mp4|webm|jpg|jpeg|png|gif)$/i.test(imagePath);

    if (!isAllowed) {
        return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    const sourceUrl = `https://www.sakugabooru.com/data/${imagePath}`;
    const rangeHeader = request.headers.get('range');

    try {
        const response = await fetch(sourceUrl, {
            headers: {
                'User-Agent': 'Sakugaa/1.0 (https://sakugaa.com)',
                ...(rangeHeader && { 'Range': rangeHeader }),
            },
        });

        if (!response.ok && response.status !== 206) {
            return new NextResponse('Not found', { status: 404 });
        }

        const contentType = response.headers.get('content-type') || 'image/jpeg';

        return new NextResponse(response.body, {
            status: response.status,
            headers: {
                'Content-Type': contentType,
                'Accept-Ranges': 'bytes',
                ...(response.headers.get('content-range') && {
                    'Content-Range': response.headers.get('content-range')!
                }),
                ...(response.headers.get('content-length') && {
                    'Content-Length': response.headers.get('content-length')!
                }),
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