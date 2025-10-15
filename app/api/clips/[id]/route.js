import { NextResponse } from "next/server";

export async function GET(request){
    try{
        const {searchParams} = new URL(request.url);
        const id = searchParams.get('id');
        const url = `https://sakugabooru.com/post.json?tags=id:${id}`;
        console.log('Obtention du clip ID:',id);
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("erreur lors de la requete HTTP:"+response.status);
        }
        const data = await response.json();
        console.log('Renvoi du clip:',data[0])
        return NextResponse.json(data[0],{
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=120'
        });
    }catch(error){
        console.error('❌ ERREUR dans API Route:', error.message);
    }
}