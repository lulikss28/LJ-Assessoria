'use client'

import { MapPin, Globe, ArrowRight } from 'lucide-react'

const states = [
  { code: 'BA', name: 'Bahia', position: 'top-[25%] right-[15%]' },
  { code: 'RJ', name: 'Rio de Janeiro', position: 'top-[55%] right-[10%]' },
  { code: 'MG', name: 'Minas Gerais', position: 'top-[40%] right-[25%]' },
  { code: 'RS', name: 'Rio Grande do Sul', position: 'bottom-[15%] right-[30%]' },
  { code: 'SC', name: 'Santa Catarina', position: 'bottom-[25%] right-[20%]' },
  { code: 'PE', name: 'Pernambuco', position: 'top-[20%] right-[5%]' },
]

interface CoverageSectionProps {
  onOpenModal: () => void
}

export function CoverageSection({ onOpenModal }: CoverageSectionProps) {
  return (
    <section className="py-20 lg:py-28 bg-[#0A1128] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#C5A059]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#C5A059]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#C5A059]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <p className="text-[#C5A059] text-sm font-semibold uppercase tracking-widest mb-4">
                — Abrangência Nacional —
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
                Atendemos em{' '}
                <span className="text-[#C5A059]">Todo o Brasil</span>
              </h2>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 flex items-center justify-center flex-shrink-0 mt-1">
                <MapPin className="w-5 h-5 text-[#C5A059]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">
                  De qualquer origem para qualquer destino.
                </h3>
                <p className="text-[#9CA3AF] leading-relaxed">
                  Não importa se a mudança é entre cidades, entre estados ou entre regiões do país. Nossa assessoria coordena a logística completa, de ponta a ponta, com a mesma excelência em todo o território nacional.
                </p>
              </div>
            </div>

            <button 
              onClick={onOpenModal}
              className="group inline-flex items-center gap-2 border-2 border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#0A1128] px-8 py-4 rounded-lg font-bold text-base transition-all duration-300"
            >
              FALAR COM UM CONSULTOR
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Content - Map Visualization */}
          <div className="relative flex justify-center">
            {/* Central hub */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Orbiting rings */}
              <div className="absolute inset-0 rounded-full border border-[#C5A059]/20 animate-pulse" />
              <div className="absolute inset-4 rounded-full border border-[#C5A059]/15" />
              <div className="absolute inset-8 rounded-full border border-[#C5A059]/10" />
              
              {/* Center badge */}
              <div className="absolute inset-12 sm:inset-16 rounded-full bg-[#101d3a] border-2 border-[#C5A059]/30 flex flex-col items-center justify-center">
                <Globe className="w-8 h-8 text-[#C5A059] mb-2" />
                <span className="text-[#C5A059] font-bold text-sm">Brasil</span>
                <span className="text-[#9CA3AF] text-xs">Cobertura Nacional</span>
                <span className="text-[#6B7280] text-[10px] mt-1">+ estados atendidos</span>
              </div>

              {/* State badges */}
              {states.map((state, index) => (
                <div 
                  key={state.code}
                  className={`absolute ${state.position} transform`}
                  style={{
                    animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                    animationDelay: `${index * 0.3}s`
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#1a2a4a] border border-[#C5A059]/40 flex items-center justify-center shadow-lg shadow-black/20 hover:scale-110 hover:border-[#C5A059] transition-all cursor-pointer">
                    <span className="text-[#C5A059] text-xs font-bold">{state.code}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  )
}
