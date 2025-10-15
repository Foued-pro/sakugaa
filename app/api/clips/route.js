import { NextResponse } from "next/server";




export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get('limit') || 12;
        const page = searchParams.get('page') || 1;
        const tags = searchParams.get('tags') || 'animated';
        const url = `https://sakugabooru.com/post.json?limit=${limit}&page=${page}&tags=${tags}`;
        console.log('🌐 API ROUTE: Fetching', url);

        const response = await fetch(url);

        console.log('📡 SAKUGABOORU status:', response.status);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
                console.log('✅ API ROUTE: Renvoi de', data.length, 'clips');

        return NextResponse.json(data,{
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=120'
        });
    }catch (error) {
        console.error('❌ ERREUR dans API Route:', error.message);
        return NextResponse.json(
            { error: 'Erreur lors de la récupération des clips' }, 
            { status: 500 }
        );
    }
}
