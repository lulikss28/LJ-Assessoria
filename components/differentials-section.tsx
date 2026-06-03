'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Globe, 
  ShieldCheck, 
  Headphones, 
  FileText, 
  Users,
  Sparkles,
  Clock,
  TrendingUp
} from 'lucide-react'

const differentials = [
  {
    icon: Globe,
    title: 'Curadoria Nacional',
    description: 'Selecionamos os melhores transportadores certificados em todo o Brasil, garantindo qualidade e confiabilidade.',
    highlight: true,
    span: 'lg:col-span-2',
  },
  {
    icon: ShieldCheck,
    title: 'Responsabilidade Civil',
    description: 'Cobertura total com seguros premium para cada item transportado.',
    highlight: false,
    span: '',
  },
  {
    icon: Headphones,
    title: 'Suporte 24h',
    description: 'Consultor dedicado disponivel a qualquer momento durante toda a operacao.',
    highlight: false,
    span: '',
  },
  {
    icon: FileText,
    title: 'Gestao de Contratos',
    description: 'Cuidamos de toda a burocracia, documentacao e seguros do inicio ao fim.',
    highlight: false,
    span: '',
  },
  {
    icon: Users,
    title: 'Equipe Especializada',
    description: 'Profissionais treinados para embalagem tecnica e manuseio de itens sensiveis.',
    highlight: false,
    span: '',
  },
  {
    icon: TrendingUp,
    title: 'Transparencia Total',
    description: 'Acompanhamento em tempo real e relatorios detalhados de cada etapa.',
    highlight: true,
    span: 'lg:col-span-2',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function DifferentialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="diferenciais" className="relative py-24 lg:py-32 bg-[#0A1128] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128] via-[#0d1a35] to-[#0A1128]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm text-gold font-medium">O Que Entregamos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Por Tras das Cenas
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Enquanto voce segue sua rotina, nossa equipe cuida de cada detalhe 
            da sua mudanca com excelencia e dedicacao.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {differentials.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group relative p-6 lg:p-8 rounded-2xl border transition-all duration-500 ${item.span} ${
                item.highlight
                  ? 'bg-gradient-to-br from-gold/10 via-gold/5 to-transparent border-gold/30 hover:border-gold/50'
                  : 'bg-white/[0.02] border-white/10 hover:border-gold/30 hover:bg-white/[0.04]'
              }`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                item.highlight 
                  ? 'bg-gold/20 text-gold' 
                  : 'bg-white/5 text-gold/70 group-hover:bg-gold/10 group-hover:text-gold'
              }`}>
                <item.icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>

              {/* Hover Glow */}
              {item.highlight && (
                <div className="absolute inset-0 rounded-2xl bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-white/10"
        >
          {[
            { value: '500+', label: 'Mudancas Realizadas' },
            { value: '27', label: 'Estados Atendidos' },
            { value: '98%', label: 'Satisfacao' },
            { value: '24/7', label: 'Suporte Ativo' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#e8c66a] mb-1">
                {stat.value}
              </div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
