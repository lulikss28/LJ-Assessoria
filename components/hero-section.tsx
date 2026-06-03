'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Clock, Shield, Sparkles } from 'lucide-react'
import Image from 'next/image'

interface HeroSectionProps {
  onOpenModal: () => void
}

export function HeroSection({ onOpenModal }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0A1128]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1128] via-[#0d1a35] to-[#0A1128]" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(197, 160, 89, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(197, 160, 89, 0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-gold/8 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-sm text-gold font-medium">Concierge Premium - Todo o Brasil</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6"
            >
              <span className="text-balance">Seu Tempo Vale Mais que{' '}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#e8c66a] to-gold">
                Qualquer Mudança
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/60 leading-relaxed mb-10 max-w-xl"
            >
              Nao somos uma transportadora. Somos o seu Concierge de Logistica Nacional. 
              Curadoria de transporte, embalagem tecnica, seguros e montagem — 
              tudo resolvido para voce ter paz de espirito.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <motion.button
                onClick={onOpenModal}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-gold to-[#a88a4a] text-[#0A1128] px-8 py-4 rounded-xl font-bold text-base shadow-xl shadow-gold/25 hover:shadow-gold/40 transition-all"
              >
                FALAR COM CONSULTOR
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <a
                href="tel:+5511915001932"
                className="flex items-center justify-center gap-2 border border-white/20 hover:border-gold/50 text-white px-8 py-4 rounded-xl font-medium transition-all hover:bg-white/5"
              >
                <Clock className="w-5 h-5 text-gold" />
                (11) 91500-1932
              </a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-6"
            >
              {[
                { icon: Shield, label: 'Seguranca Total' },
                { icon: Clock, label: 'Suporte 24h' },
                { icon: Sparkles, label: 'Servico Premium' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-white/50">
                  <item.icon className="w-4 h-4 text-gold/70" />
                  <span className="text-sm">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Logo Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            {/* Animated Rings */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute w-80 h-80 sm:w-[380px] sm:h-[380px] rounded-full border border-gold/20"
            />
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              className="absolute w-72 h-72 sm:w-[340px] sm:h-[340px] rounded-full border border-gold/10"
            />
            
            {/* Logo Image */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80"
            >
              <div className="absolute inset-0 rounded-full bg-gold/10 blur-3xl" />
              <Image
                src="/images/logo-badge.png"
                alt="LJ Assessoria de Mudanca"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>

            {/* Orbiting State Badges */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[420px] h-[420px] sm:w-[480px] sm:h-[480px]"
            >
              {['SP', 'RJ', 'MG', 'BA', 'RS', 'SC'].map((state, i) => (
                <motion.div
                  key={state}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute w-10 h-10 rounded-full bg-[#0d1a35] border border-gold/40 flex items-center justify-center text-xs font-bold text-gold shadow-lg shadow-black/30"
                  style={{
                    top: `${50 + 48 * Math.sin((i * Math.PI * 2) / 6 - Math.PI / 2)}%`,
                    left: `${50 + 48 * Math.cos((i * Math.PI * 2) / 6 - Math.PI / 2)}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {state}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A1128] to-transparent" />
    </section>
  )
}
