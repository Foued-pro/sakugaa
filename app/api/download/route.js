import { NextResponse} from "next/server";
export const runtime = 'edge';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const fileUrl=searchParams.get("url");
    const fileName = searchParams.get("filename") || 'video.mp4';

    if (!fileName) throw new Error("No file name provided");
    if (!fileUrl) return NextResponse.json({ error: 'URL manquante' }, { status: 400 });

    try{
        const response = await fetch(fileUrl);
        next: { revalidate: 3600 }
        if (!response.ok) throw new Error("Erreur fetch source");

        const headers = new Headers();
        headers.set('Content-Disposition', `attachment; filename="${fileName}"`);
        headers.set('Content-Type', response.headers.get('Content-Type'));

        return new NextResponse(response.body,{status:200,headers});
    }catch(err){
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }

}