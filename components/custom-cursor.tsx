"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false)
    const [isClicking, setIsClicking] = useState(false)
    const [cursorText, setCursorText] = useState("")
    const [isVisible, setIsVisible] = useState(false)

    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 300 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    // Trail dots
    const trailLength = 8
    const trailRefs = useRef<{ x: number; y: number }[]>(
        Array(trailLength).fill({ x: -100, y: -100 })
    )

    useEffect(() => {
        // Hide default cursor
        document.body.style.cursor = "none"

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
            setIsVisible(true)

            // Update trail
            trailRefs.current = [
                { x: e.clientX, y: e.clientY },
                ...trailRefs.current.slice(0, trailLength - 1)
            ]
        }

        const handleMouseDown = () => setIsClicking(true)
        const handleMouseUp = () => setIsClicking(false)

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement

            if (target.closest("a, button, [data-cursor-hover]")) {
                setIsHovering(true)
                const text = target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text")
                if (text) setCursorText(text)
            }
        }

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (target.closest("a, button, [data-cursor-hover]")) {
                setIsHovering(false)
                setCursorText("")
            }
        }

        const handleMouseLeave = () => setIsVisible(false)
        const handleMouseEnter = () => setIsVisible(true)

        window.addEventListener("mousemove", moveCursor)
        window.addEventListener("mousedown", handleMouseDown)
        window.addEventListener("mouseup", handleMouseUp)
        window.addEventListener("mouseover", handleMouseOver)
        window.addEventListener("mouseout", handleMouseOut)
        document.addEventListener("mouseleave", handleMouseLeave)
        document.addEventListener("mouseenter", handleMouseEnter)

        return () => {
            document.body.style.cursor = "auto"
            window.removeEventListener("mousemove", moveCursor)
            window.removeEventListener("mousedown", handleMouseDown)
            window.removeEventListener("mouseup", handleMouseUp)
            window.removeEventListener("mouseover", handleMouseOver)
            window.removeEventListener("mouseout", handleMouseOut)
            document.removeEventListener("mouseleave", handleMouseLeave)
            document.removeEventListener("mouseenter", handleMouseEnter)
        }
    }, [cursorX, cursorY])

    // Don't render on touch devices
    if (typeof window !== "undefined" && "ontouchstart" in window) {
        return null
    }

    return (
        <>
            {/* Trail dots */}
            {trailRefs.current.map((_, index) => (
                <motion.div
                    key={index}
                    className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full bg-[#c4b5fd]"
                    style={{
                        x: cursorXSpring,
                        y: cursorYSpring,
                        width: 6 - index * 0.5,
                        height: 6 - index * 0.5,
                        opacity: isVisible ? (1 - index * 0.12) * 0.4 : 0,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                    transition={{ delay: index * 0.02 }}
                />
            ))}

            {/* Main cursor dot */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-foreground mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    width: isClicking ? 12 : isHovering ? 48 : 16,
                    height: isClicking ? 12 : isHovering ? 48 : 16,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
            />

            {/* Cursor ring */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border-2 border-[#c4b5fd]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    width: isClicking ? 24 : isHovering ? 64 : 40,
                    height: isClicking ? 24 : isHovering ? 64 : 40,
                    opacity: isVisible ? (isHovering ? 1 : 0.5) : 0,
                    borderColor: isHovering ? "#c4b5fd" : "#e7e5e4",
                }}
                transition={{ type: "spring", damping: 15, stiffness: 200 }}
            />

            {/* Cursor text */}
            {cursorText && (
                <motion.div
                    className="pointer-events-none fixed left-0 top-0 z-[10000] flex items-center justify-center text-xs font-medium text-background"
                    style={{
                        x: cursorXSpring,
                        y: cursorYSpring,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                >
                    {cursorText}
                </motion.div>
            )}
        </>
    )
}
