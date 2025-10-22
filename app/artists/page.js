"use client"
import { useEffect, useState } from "react"


export default function ArtistPage(){
const [listArtist,setListArtist]  = useState([]) ;
useEffect(()=>{
    async function LoadArtist(){
        const data = await fetch();
        

    }
})    



return(
        <>
        <h1>Liste des artists</h1>
        </>
    )
}

