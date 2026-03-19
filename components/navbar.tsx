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
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }
  },
  open: {
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }
  }
};

const linkVariants = {
  closed: { opacity: 0, x: -20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }
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

  // Lock body scroll when menu is open
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
              backgroundColor: isOpen ? "rgba(255,255,255,0)" : navBackground,
              boxShadow: isOpen ? "none" : navShadow,
              backdropFilter: isOpen ? "none" : navBackdrop
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
                <span className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-white' : 'text-[#1a1a1a]'}`}>
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
                className="md:hidden relative z-10 p-2"
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.9 }}
                aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
              >
                {isOpen ? (
                    <X size={26} className="text-white" />
                ) : (
                    <Menu size={26} className="text-[#1a1a1a]" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </motion.nav>

        {/* Mobile Fullscreen Menu */}
        <AnimatePresence>
          {isOpen && (
              <motion.div
                  variants={menuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="fixed inset-0 z-50 md:hidden bg-[#1a1a1a] flex flex-col"
              >
                {/* Decorative blob */}
                <div className="absolute top-[10%] right-[-20%] w-[400px] h-[400px] bg-[#c4b5fd]/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[10%] left-[-10%] w-[300px] h-[300px] bg-[#c4b5fd]/5 rounded-full blur-[80px] pointer-events-none" />

                {/* Nav Links */}
                <div className="flex-1 flex flex-col justify-center px-8 pt-24">
                  <div className="space-y-2">
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
                              className="group flex items-center justify-between py-5 border-b border-white/10"
                          >
                            <div>
                              <span className="text-3xl font-bold text-white group-hover:text-[#c4b5fd] transition-colors">
                                {link.name}
                              </span>
                              <p className="text-sm text-gray-500 mt-1">{link.desc}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-[#c4b5fd] group-hover:translate-x-1 transition-all" />
                          </Link>
                        </motion.div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <motion.div
                      custom={navLinks.length}
                      variants={linkVariants}
                      initial="closed"
                      animate="open"
                      className="flex flex-col gap-3 mt-12"
                  >
                    <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="w-full py-4 rounded-full bg-[#c4b5fd] text-[#1a1a1a] text-center text-lg font-bold hover:bg-[#b4a5ed] transition-colors"
                    >
                      Join Free
                    </Link>
                    <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="w-full py-4 rounded-full border border-white/20 text-white text-center text-lg font-medium hover:border-white/40 transition-colors"
                    >
                      Log in
                    </Link>
                  </motion.div>
                </div>

                {/* Bottom branding */}
                <motion.div
                    custom={navLinks.length + 1}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    className="px-8 pb-10"
                >
                  <p className="text-xs text-gray-600 tracking-widest uppercase">
                    The modern sakuga platform
                  </p>
                </motion.div>
              </motion.div>
          )}
        </AnimatePresence>
      </>
  )
}