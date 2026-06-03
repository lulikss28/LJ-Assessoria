import { Phone, ClipboardList, Search, Eye, CheckCircle } from 'lucide-react'

const steps = [
  {
    number: 1,
    icon: Phone,
    title: 'Primeiro Contato',
    description: 'Você entra em contato e conversamos sobre sua mudança.',
  },
  {
    number: 2,
    icon: ClipboardList,
    title: 'Coleta de Informações',
    description: 'Levantamos todos os detalhes necessários para planejar.',
  },
  {
    number: 3,
    icon: Search,
    title: 'Busca e Curadoria',
    description: 'Selecionamos os melhores transportadores para você.',
  },
  {
    number: 4,
    icon: Eye,
    title: 'Monitoramento',
    description: 'Acompanhamos toda a execução em tempo real.',
  },
  {
    number: 5,
    icon: CheckCircle,
    title: 'Entrega e Satisfação',
    description: 'Garantimos que tudo chegue perfeito ao destino.',
  },
]

export function ProcessSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#C5A059] text-sm font-semibold uppercase tracking-widest mb-4">
            — Processo —
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1128] mb-6 text-balance">
            Como Funciona Nossa Assessoria
          </h2>
          <p className="text-[#6B7280] text-lg leading-relaxed">
            Do primeiro contato à entrega final, você tem um consultor dedicado cuidando de tudo.
          </p>
        </div>

        {/* Steps - Desktop */}
        <div className="hidden lg:flex items-start justify-between relative">
          {/* Connecting line */}
          <div className="absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#C5A059]/20 via-[#C5A059] to-[#C5A059]/20" />
          
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center w-1/5">
              {/* Number badge */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-[#0A1128] border-4 border-white shadow-xl flex items-center justify-center mb-6">
                <step.icon className="w-8 h-8 text-[#C5A059]" />
                <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#C5A059] text-[#0A1128] text-sm font-bold flex items-center justify-center">
                  {step.number}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-[#0A1128] mb-2">{step.title}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed px-2">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Steps - Mobile */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              {/* Icon and line container */}
              <div className="flex flex-col items-center">
                <div className="relative w-14 h-14 rounded-full bg-[#0A1128] flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-6 h-6 text-[#C5A059]" />
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#C5A059] text-[#0A1128] text-xs font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-12 bg-gradient-to-b from-[#C5A059] to-[#C5A059]/20 mt-2" />
                )}
              </div>
              
              {/* Content */}
              <div className="pt-2">
                <h3 className="text-lg font-bold text-[#0A1128] mb-1">{step.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
