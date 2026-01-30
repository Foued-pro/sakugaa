"use client"

import React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

interface ScrollRevealProps {
    children: React.ReactNode
    className?: string
    direction?: "up" | "down" | "left" | "right"
    delay?: number
    duration?: number
    once?: boolean
}

export function ScrollReveal({
                                 children,
                                 className = "",
                                 direction = "up",
                                 delay = 0,
                                 duration = 0.6,
                                 once = true,
                             }: ScrollRevealProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once, margin: "-100px" })

    const directions = {
        up: { y: 60, x: 0 },
        down: { y: -60, x: 0 },
        left: { x: 60, y: 0 },
        right: { x: -60, y: 0 },
    }

    const initial = directions[direction]

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, ...initial }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...initial }}
            transition={{
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

interface ParallaxProps {
    children: React.ReactNode
    className?: string
    speed?: number
    direction?: "up" | "down"
}

export function Parallax({
                             children,
                             className = "",
                             speed = 0.5,
                             direction = "up",
                         }: ParallaxProps) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    const multiplier = direction === "up" ? -1 : 1
    const y = useTransform(scrollYProgress, [0, 1], [100 * speed * multiplier, -100 * speed * multiplier])

    return (
        <motion.div ref={ref} style={{ y }} className={className}>
            {children}
        </motion.div>
    )
}

interface TextRevealProps {
    text: string
    className?: string
    delay?: number
}

export function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    const words = text.split(" ")

    return (
        <span ref={ref} className={className}>
      {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block overflow-hidden">
          <motion.span
              className="inline-block"
              initial={{ y: "100%", opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
              transition={{
                  duration: 0.5,
                  delay: delay + wordIndex * 0.05,
                  ease: [0.22, 1, 0.36, 1],
              }}
          >
            {word}
              {wordIndex < words.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </span>
    )
}

interface ScaleOnScrollProps {
    children: React.ReactNode
    className?: string
}

export function ScaleOnScroll({ children, className = "" }: ScaleOnScrollProps) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])

    return (
        <motion.div ref={ref} style={{ scale, opacity }} className={className}>
            {children}
        </motion.div>
    )
}

interface RotateOnScrollProps {
    children: React.ReactNode
    className?: string
    degrees?: number
}

export function RotateOnScroll({ children, className = "", degrees = 10 }: RotateOnScrollProps) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    const rotate = useTransform(scrollYProgress, [0, 1], [-degrees, degrees])

    return (
        <motion.div ref={ref} style={{ rotate }} className={className}>
            {children}
        </motion.div>
    )
}
