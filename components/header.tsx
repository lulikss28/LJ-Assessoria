'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

interface HeaderProps {
  onOpenModal: () => void
}

export function Header({ onOpenModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Processo', href: '#processo' },
    { label: 'Contato', href: '#contato' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#0A1128]/95 backdrop-blur-xl border-b border-gold/10 shadow-lg shadow-black/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold/30 group-hover:border-gold/60 transition-colors">
              <Image
                src="/images/logo-badge.png"
                alt="LJ Assessoria"
                fill
                className="object-cover"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-bold text-white tracking-tight">LJ Assessoria</span>
              <span className="text-[10px] text-gold uppercase tracking-[0.2em] -mt-0.5">Concierge de Mudancas</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 hover:text-gold transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <motion.button
              onClick={onOpenModal}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-gold to-[#a88a4a] text-[#0A1128] px-6 py-2.5 rounded-lg font-semibold text-sm shadow-lg shadow-gold/20 hover:shadow-gold/30 transition-shadow"
            >
              SOLICITAR ORÇAMENTO
            </motion.button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-[#0A1128]/98 backdrop-blur-xl border-t border-gold/10"
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-white/80 hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false)
                onOpenModal()
              }}
              className="w-full bg-gradient-to-r from-gold to-[#a88a4a] text-[#0A1128] px-6 py-3 rounded-lg font-semibold text-sm mt-4"
            >
              SOLICITAR ORÇAMENTO
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
