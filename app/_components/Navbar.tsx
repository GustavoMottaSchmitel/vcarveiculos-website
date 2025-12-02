"use client"

import React, { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/", exact: true },
    { name: "Veículos", href: "/galeria", exact: false },
    { name: "Serviços", href: "/#services", exact: false },
    { name: "Sobre", href: "/#about", exact: false },
    { name: "Contato", href: "/#contact", exact: false },
  ]

  // Função para verificar se um link está ativo
  const isActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href
    }
    return pathname?.startsWith(href)
  }

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed top-0 w-full z-60 transition-all duration-300 ${
          scrolled 
            ? "bg-black/90 backdrop-blur-xl border-b border-amber-500/10" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3">
              <motion.div 
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image 
                  src="/logo-no-background.png"
                  alt="VCar Veículos"
                  width={100}
                  height={100}
                  className="object-contain drop-shadow-[0_0_10px_rgba(255,195,0,0.25)]"
                />
              </motion.div>
            </Link>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => {
                const active = isActive(item.href, item.exact)
                return (
                  <motion.div key={item.name} whileHover={{ scale: 1.05 }}>
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                        active
                          ? "text-amber-400"
                          : "text-gray-300 hover:text-amber-300"
                      }`}
                    >
                      {active && (
                        <motion.div
                          layoutId="activeNavItem"
                          className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-400/5 border border-amber-500/20 rounded-lg"
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                      )}
                      <span className="relative z-10">{item.name}</span>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA + MOBILE MENU BUTTON */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="hidden md:block px-6 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-yellow-500 text-white font-semibold text-sm tracking-wide hover:from-amber-500 hover:to-yellow-400 transition-all duration-300"
              >
                Contato
              </motion.button>

              {/* HAMBURGER */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden w-10 h-10 flex flex-col items-center justify-center rounded-lg border border-amber-500/20 bg-black/60 backdrop-blur-sm"
              >
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0 }}
                  className="w-6 h-0.5 bg-amber-400 block mb-1.5"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-6 h-0.5 bg-amber-400 block mb-1.5"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0 }}
                  className="w-6 h-0.5 bg-amber-400 block"
                />
              </motion.button>
            </div>

          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden"
          >
            <div className="bg-black/95 backdrop-blur-xl border-b border-amber-500/10">
              <div className="px-4 pt-3 pb-6 space-y-1">

                {navItems.map((item, index) => {
                  const active = isActive(item.href, item.exact)
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                    >
                      <Link
                        href={item.href}
                        onClick={handleLinkClick}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium ${
                          active
                            ? "text-amber-400 bg-white/5 border border-amber-500/20"
                            : "text-gray-300 hover:text-amber-300 hover:bg-white/5"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  )
                })}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-600 to-yellow-500 text-white font-semibold"
                >
                  Entrar em Contato
                </motion.button>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black z-30 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}