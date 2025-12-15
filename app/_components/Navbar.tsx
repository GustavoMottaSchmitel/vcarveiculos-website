"use client"

import React, { useState, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const NAV_ITEMS = [
  { name: "Home", href: "/", exact: true },
  { name: "Veículos", href: "/galeria", exact: false },
  { name: "Assistente", href: "/#assistente", exact: false },
  { name: "Contato", href: "/#contato", exact: false },
  { name: "Localizacao", href: "/#localizacao", exact: false },
] as const

const SCROLL_THRESHOLD = 20

// Variantes de animação
const navbarVariants = {
  initial: { y: -80 },
  animate: { y: 0 },
}

const mobileMenuVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 0.7 },
  exit: { opacity: 0 },
}

const mobileItemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
}

// Componente do Hamburger Menu
const HamburgerButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
  <motion.button
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className="md:hidden w-10 h-10 flex flex-col items-center justify-center rounded-lg border border-amber-500/20 bg-black/60 backdrop-blur-sm"
    aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
    aria-expanded={isOpen}
  >
    <motion.span
      animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
      className="w-6 h-0.5 bg-amber-400 block mb-1.5"
    />
    <motion.span
      animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
      className="w-6 h-0.5 bg-amber-400 block mb-1.5"
    />
    <motion.span
      animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
      className="w-6 h-0.5 bg-amber-400 block"
    />
  </motion.button>
)

// Componente do Logo
const Logo = () => (
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
        priority
      />
    </motion.div>
  </Link>
)

// Componente do Item de Navegação Desktop
const DesktopNavItem = ({ 
  item, 
  isActive, 
  onClick 
}: { 
  item: typeof NAV_ITEMS[number]
  isActive: boolean
  onClick: (href: string) => void 
}) => (
  <motion.div whileHover={{ scale: 1.05 }}>
    <Link
      href={item.href}
      onClick={() => onClick(item.href)}
      className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
        isActive
          ? "text-amber-400"
          : "text-gray-300 hover:text-amber-300"
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="activeNavItem"
          className="absolute inset-0 bg-linear-to-r from-amber-500/10 to-yellow-400/5 border border-amber-500/20 rounded-lg"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}
      <span className="relative z-10">{item.name}</span>
    </Link>
  </motion.div>
)

// Componente do Item de Navegação Mobile
const MobileNavItem = ({ 
  item, 
  isActive, 
  onClick,
  index 
}: { 
  item: typeof NAV_ITEMS[number]
  isActive: boolean
  onClick: (href: string) => void
  index: number
}) => (
  <motion.div
    variants={mobileItemVariants}
    initial="initial"
    animate="animate"
    transition={{ delay: index * 0.08 }}
  >
    <Link
      href={item.href}
      onClick={() => onClick(item.href)}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
        isActive
          ? "text-amber-400 bg-white/5 border border-amber-500/20"
          : "text-gray-300 hover:text-amber-300 hover:bg-white/5"
      }`}
    >
      {item.name}
    </Link>
  </motion.div>
)

// Componente do CTA Button
const CTAButton = ({ className = "" }: { className?: string }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    className={`px-6 py-2 rounded-lg bg-linear-to-r from-amber-600 to-yellow-500 text-white font-semibold text-sm tracking-wide hover:from-amber-500 hover:to-yellow-400 transition-all duration-300 ${className}`}
  >
    Contato
  </motion.button>
)

// Componente Principal
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Effect para controlar o scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Effect para bloquear scroll quando menu mobile está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Função para verificar se um link está ativo
  const isActive = useCallback((href: string, exact: boolean) => {
    if (exact) {
      return pathname === href
    }
    return pathname?.startsWith(href) ?? false
  }, [pathname])

  // Handler para fechar o menu
  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  // Handler para toggle do menu
  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  // Handler para links - fecha o menu e permite navegação
  const handleLinkClick = useCallback((href: string) => {
    setIsOpen(false)
    // Se for um link de âncora, rola suavemente
    if (href.includes('#')) {
      const id = href.split('#')[1]
      if (id) {
        setTimeout(() => {
          const element = document.getElementById(id)
          element?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [])

  return (
    <>
      {/* Navbar Principal */}
      <motion.nav
        variants={navbarVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-black/90 backdrop-blur-xl border-b border-amber-500/10" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <Logo />

            {/* Menu Desktop */}
            <nav className="hidden md:flex items-center space-x-2" aria-label="Menu principal">
              {NAV_ITEMS.map((item) => (
                <DesktopNavItem 
                  key={item.name}
                  item={item}
                  isActive={isActive(item.href, item.exact)}
                  onClick={handleLinkClick}
                />
              ))}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-4">
              <CTAButton className="hidden md:block" />
              <HamburgerButton isOpen={isOpen} onClick={handleToggle} />
            </div>

          </div>
        </div>
      </motion.nav>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden"
          >
            <div className="bg-black/95 backdrop-blur-xl border-b border-amber-500/10">
              <nav className="px-4 pt-3 pb-6 space-y-1" aria-label="Menu mobile">
                {NAV_ITEMS.map((item, index) => (
                  <MobileNavItem
                    key={item.name}
                    item={item}
                    isActive={isActive(item.href, item.exact)}
                    onClick={handleLinkClick}
                    index={index}
                  />
                ))}

                <CTAButton className="w-full mt-4 py-3" />
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={handleClose}
            className="fixed inset-0 bg-black z-30 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}