

import { NextResponse } from "next/server";
export const runtime = 'edge';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get('limit') || 12;
        const page = searchParams.get('page') || 1;
        
        // ✅ URL corrigée pour l'API des artistes
        const url = `https://sakugabooru.com/artist.json?limit=${limit}&page=${page}`;

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        // ✅ Headers correctement formatés
        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=120'
            }
        });
    } catch (error) {
        console.error('ERREUR requête artiste:', error.message);
        return NextResponse.json(
            { error: 'Erreur lors de la récupération des artistes' }, 
            { status: 500 }
        );
    }
}