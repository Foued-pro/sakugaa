"use client"

import React from "react"
import { motion } from "framer-motion"

// Ajout du modificateur 'readonly' sur toutes les propriétés
interface MorphingBlobProps {
    readonly className?: string
    readonly color?: string
    readonly size?: number
    readonly duration?: number
}

export function MorphingBlob({
                                 className = "",
                                 color = "#c4b5fd",
                                 size = 300,
                                 duration = 8,
                             }: MorphingBlobProps) {
    const paths = [
        "M45.3,-51.2C58.4,-41.8,68.8,-27.5,71.8,-11.4C74.8,4.7,70.4,22.5,60.6,36.3C50.8,50.1,35.6,59.8,18.6,65.7C1.6,71.6,-17.2,73.6,-33.1,67.4C-49,61.2,-62,46.8,-68.8,29.8C-75.6,12.8,-76.2,-6.8,-69.4,-23.1C-62.6,-39.4,-48.4,-52.4,-33.2,-61.2C-18,-70,-0.9,-74.6,14.6,-72.5C30.1,-70.4,32.2,-60.6,45.3,-51.2Z",
        "M38.9,-47.7C50.8,-37.9,61.1,-26.5,65.6,-12.4C70.1,1.7,68.8,18.5,61.2,32.1C53.6,45.7,39.7,56.1,24,62.5C8.3,68.9,-9.2,71.3,-24.8,66.6C-40.4,61.9,-54.1,50.1,-62.1,35.3C-70.1,20.5,-72.4,2.7,-68.4,-13.1C-64.4,-28.9,-54.1,-42.7,-41.3,-52.3C-28.5,-61.9,-13.2,-67.3,0.5,-67.9C14.2,-68.5,27,-57.5,38.9,-47.7Z",
        "M42.8,-48.5C55.4,-38.7,65.4,-25.1,68.5,-9.8C71.6,5.5,67.8,22.5,58.3,35.5C48.8,48.5,33.6,57.5,17.1,62.5C0.6,67.5,-17.2,68.5,-32.8,62.4C-48.4,56.3,-61.8,43.1,-68.3,27.1C-74.8,11.1,-74.4,-7.7,-67.6,-23.5C-60.8,-39.3,-47.6,-52.1,-33.2,-61.4C-18.8,-70.7,-3.2,-76.5,10.8,-74.1C24.8,-71.7,30.2,-58.3,42.8,-48.5Z",
        "M47.7,-56.1C60.8,-45.4,69.8,-30.2,72.8,-13.8C75.8,2.6,72.8,20.2,64.3,34.5C55.8,48.8,41.8,59.8,25.8,66.1C9.8,72.4,-8.2,74,-24.3,69.1C-40.4,64.2,-54.6,52.8,-63.1,38.2C-71.6,23.6,-74.4,5.8,-70.8,-10.2C-67.2,-26.2,-57.2,-40.4,-44.3,-51.2C-31.4,-62,-15.7,-69.4,0.5,-70C16.7,-70.6,34.6,-66.8,47.7,-56.1Z",
    ]

    return (
        <motion.svg
            viewBox="-100 -100 200 200"
            className={className}
            style={{ width: size, height: size }}
        >
            <motion.path
                fill={color}
                // Cette ligne est cruciale pour éviter l'erreur "undefined path" au premier rendu
                d={paths[0]}
                animate={{
                    d: paths,
                }}
                transition={{
                    duration,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
            />
        </motion.svg>
    )
}