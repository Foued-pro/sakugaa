"use client"

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { name: "Clips", href: "/animations", desc: "Browse the full sakuga archive" },
  { name: "Artists", href: "/artists", desc: "Discover talented animators" },
  { name: "Community", href: "/community", desc: "Join the conversation" },
]

const menuVariants = {
  closed: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const }
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }
  }
};

const linkVariants = {
  closed: { opacity: 0, y: -6 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 + i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }
  })
};

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
      <>
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            style={{
              backgroundColor: navBackground,
              boxShadow: navShadow,
              backdropFilter: navBackdrop
            }}
            className="fixed top-0 left-0 right-0 z-[60] transition-colors duration-300"
        >
          <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 md:px-12 py-6">
            <Link href="/" className="group relative z-10" onClick={() => setIsOpen(false)}>
              <div className="flex items-center gap-2">
                <motion.span
                    className="w-3 h-3 bg-[#c4b5fd] rounded-sm"
                    whileHover={{ rotate: 180, scale: 1.1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
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
            <motion.button
                className="md:hidden relative z-10 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 border border-gray-200"
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.9 }}
                aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
              >
                {isOpen ? (
                    <X size={18} className="text-[#1a1a1a]" />
                ) : (
                    <Menu size={18} className="text-[#1a1a1a]" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </motion.nav>

        {/* Mobile Menu — white, slide down from top */}
        <AnimatePresence>
          {isOpen && (
              <motion.div
                  variants={menuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="fixed top-0 left-0 right-0 z-50 md:hidden bg-white border-b border-gray-100 pt-24 pb-6 px-4"
              >
                {/* Links */}
                <div className="flex flex-col gap-1 mb-4">
                  {navLinks.map((link, i) => (
                      <motion.div
                          key={link.name}
                          custom={i}
                          variants={linkVariants}
                          initial="closed"
                          animate="open"
                      >
                        <Link
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="group flex items-center justify-between px-4 py-4 rounded-2xl hover:bg-gray-50 transition-colors"
                        >
                          <div>
                            <span className="text-lg font-bold text-[#1a1a1a] group-hover:text-[#c4b5fd] transition-colors">
                              {link.name}
                            </span>
                            <p className="text-sm text-gray-400 mt-0.5">{link.desc}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#c4b5fd] group-hover:translate-x-1 transition-all" />
                        </Link>
                      </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <motion.div
                    custom={navLinks.length}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    className="flex flex-col gap-2 px-2"
                >
                  <div className="h-px bg-gray-100 mb-2" />
                  <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="w-full py-4 rounded-full bg-[#1a1a1a] text-white text-center text-base font-bold hover:bg-black transition-colors"
                  >
                    Join Free
                  </Link>
                  <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="w-full py-4 rounded-full border border-gray-200 text-[#1a1a1a] text-center text-base font-medium hover:border-gray-400 transition-colors"
                  >
                    Log in
                  </Link>
                </motion.div>
              </motion.div>
          )}
        </AnimatePresence>
      </>
  )
}