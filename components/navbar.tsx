"use client"

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { name: "Clips", href: "/animations" },
  { name: "Artists", href: "/artists" },
  { name: "Community", href: "/community" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const { scrollY } = useScroll()
  const navBackground = useTransform(
      scrollY,
      [0, 50],
      ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"]
  )
  const navBackdrop = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(12px)"])
  const navShadow = useTransform(scrollY, [0, 50], ["none", "0 4px 20px -4px rgba(0,0,0,0.05)"])

  return (
      <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ backgroundColor: navBackground, boxShadow: navShadow, backdropFilter: navBackdrop }}
          className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 md:px-12 py-6">

          {/* Logo mis à jour */}
          <Link href="/" className="group relative z-10">
            <div className="flex items-center gap-2">
              <motion.span
                  className="w-3 h-3 bg-[#c4b5fd] rounded-sm"
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="text-2xl font-bold tracking-tight text-[#1a1a1a]">
                Sakug<span className="font-serif italic text-[#c4b5fd]">aa</span>
              </span>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden items-center gap-2 md:flex bg-white/50 p-2 rounded-full border border-gray-100/50 backdrop-blur-sm"
               onMouseLeave={() => setHoveredIndex(null)}
          >
            {navLinks.map((link, index) => (
                <Link key={link.name} href={link.href} className="relative px-6 py-3 text-base font-medium text-gray-600 transition-colors hover:text-black z-10"
                      onMouseEnter={() => setHoveredIndex(index)}
                >
                  {hoveredIndex === index && (
                      <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 bg-gray-100 rounded-full -z-10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                  )}
                  {link.name}
                </Link>
            ))}
          </div>

          {/* Actions Desktop */}
          <div className="hidden items-center gap-4 md:flex">
            <Button
                variant="ghost"
                className="rounded-full px-6 py-6 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-all"
                asChild
            >
              <Link href="/login">Log in</Link>
            </Button>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="rounded-full bg-[#1a1a1a] px-8 py-6 text-base text-white hover:bg-black/80 shadow-sm" asChild>
                <Link href="/login">Join Free</Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-[#1a1a1a] p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
              <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-white border-t border-gray-100 md:hidden shadow-xl"
              >
                <div className="flex flex-col gap-6 px-6 py-8">
                  {navLinks.map((link) => (
                      <Link key={link.name} href={link.href} className="text-xl font-medium text-[#1a1a1a]" onClick={() => setIsOpen(false)}>
                        {link.name}
                      </Link>
                  ))}
                  <hr className="border-gray-100"/>

                  <div className="flex flex-col gap-3">
                    <Button variant="outline" className="w-full rounded-full py-6 text-lg border-gray-200 text-gray-700 hover:bg-gray-50" asChild>
                      <Link href="/login">Log in</Link>
                    </Button>

                    <Button className="w-full rounded-full bg-[#1a1a1a] py-6 text-lg text-white" asChild>
                      <Link href="/login">Join Free</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
  )
}