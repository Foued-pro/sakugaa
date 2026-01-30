"use client"

import React from "react"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { useSoundEffect } from "@/lib/sounds"

interface MagneticButtonProps {
    children: React.ReactNode
    className?: string
    onClick?: () => void
    strength?: number
    as?: "button" | "a"
    href?: string
}

export function MagneticButton({
                                   children,
                                   className = "",
                                   onClick,
                                   strength = 0.3,
                                   as = "button",
                                   href,
                               }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const { playHover, playClick } = useSoundEffect()

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return

        const { clientX, clientY } = e
        const { left, top, width, height } = ref.current.getBoundingClientRect()
        const centerX = left + width / 2
        const centerY = top + height / 2

        const x = (clientX - centerX) * strength
        const y = (clientY - centerY) * strength

        setPosition({ x, y })
    }

    const handleMouseEnter = () => {
        playHover()
    }

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 })
    }

    const handleClick = () => {
        playClick()
        onClick?.()
    }

    const Component = as === "a" ? motion.a : motion.button
    const linkProps = as === "a" ? { href } : {}

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="inline-block"
        >
            <Component
                className={className}
                onClick={handleClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                {...linkProps}
            >
                {children}
            </Component>
        </motion.div>
    )
}
