import { Globe, Award, Star, FileText, Headphones } from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Gestão Logística Nacional',
    description: 'Coordenamos mudanças para qualquer estado do Brasil, com planejamento completo e execução impecável.',
  },
  {
    icon: Award,
    title: 'Curadoria de Transportadores Certificados',
    description: 'Trabalhamos apenas com transportadoras homologadas, experientes e de confiança comprovada.',
  },
  {
    icon: Star,
    title: 'Acompanhamento VIP',
    description: 'Monitoramento em tempo real, consultor exclusivo e resolução ágil de qualquer imprevisto.',
  },
  {
    icon: FileText,
    title: 'Gestão de Contratos e Seguros',
    description: 'Cuidamos de toda a burocracia, documentação e seguro dos seus bens do início ao fim.',
  },
  {
    icon: Headphones,
    title: 'Suporte Dedicado 360°',
    description: 'Atendimento personalizado antes, durante e após a mudança. Você sempre tem alguém ao seu lado.',
  },
]

export function ServicesSection() {
  return (
    <section id="diferenciais" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#C5A059] text-sm font-semibold uppercase tracking-widest mb-4">
            — O que entregamos —
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1128] mb-6 text-balance">
            Serviços de Assessoria Premium
          </h2>
          <p className="text-[#6B7280] text-lg leading-relaxed">
            Cada detalhe da sua mudança é gerenciado por especialistas. Você compra paz de espírito — nós entregamos resultados.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.slice(0, 3).map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
        
        {/* Bottom row centered */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-2xl mx-auto mt-6 lg:mt-8">
          {services.slice(3).map((service, index) => (
            <ServiceCard key={index + 3} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: typeof services[0] }) {
  const Icon = service.icon
  
  return (
    <div className="group bg-[#f8f9fa] hover:bg-[#0A1128] rounded-2xl p-8 transition-all duration-500 hover:shadow-xl hover:shadow-[#0A1128]/10">
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-[#0A1128] group-hover:bg-[#C5A059] flex items-center justify-center mb-6 transition-colors duration-500">
        <Icon className="w-7 h-7 text-[#C5A059] group-hover:text-[#0A1128] transition-colors duration-500" />
      </div>
      
      {/* Content */}
      <h3 className="text-xl font-bold text-[#0A1128] group-hover:text-white mb-3 transition-colors duration-500">
        {service.title}
      </h3>
      <p className="text-[#6B7280] group-hover:text-[#9CA3AF] leading-relaxed transition-colors duration-500">
        {service.description}
      </p>
    </div>
  )
}
