import { Star, Phone, Mail, MapPin, Globe, MessageCircle, Users } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contato" className="bg-[#050a14] border-t border-[#C5A059]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#C5A059] flex items-center justify-center">
                <Star className="w-6 h-6 text-[#0A1128]" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white tracking-tight">LJ</span>
                <span className="text-xs text-[#9CA3AF] uppercase tracking-widest -mt-1">Assessoria de Mudança</span>
              </div>
            </Link>
            <p className="text-[#9CA3AF] leading-relaxed max-w-md mb-6">
              Assessoria premium para mudanças residenciais e corporativas em todo o Brasil. 
              Sua tranquilidade é nossa prioridade.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-[#1a2a4a] hover:bg-[#C5A059] flex items-center justify-center transition-colors group"
                aria-label="Instagram"
              >
                <Globe className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#0A1128]" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-[#1a2a4a] hover:bg-[#C5A059] flex items-center justify-center transition-colors group"
                aria-label="Facebook"
              >
                <MessageCircle className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#0A1128]" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-[#1a2a4a] hover:bg-[#C5A059] flex items-center justify-center transition-colors group"
                aria-label="LinkedIn"
              >
                <Users className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#0A1128]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {[
                { label: 'Início', href: '#' },
                { label: 'Diferenciais', href: '#diferenciais' },
                { label: 'Orçamento', href: '#orcamento' },
                { label: 'Contato', href: '#contato' },
              ].map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-[#9CA3AF] hover:text-[#C5A059] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6">Contato</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="tel:+5511915001932"
                  className="flex items-center gap-3 text-[#9CA3AF] hover:text-[#C5A059] transition-colors text-sm"
                >
                  <Phone className="w-5 h-5 text-[#C5A059]" />
                  (11) 91500-1932
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contato@ljassessoria.com.br"
                  className="flex items-center gap-3 text-[#9CA3AF] hover:text-[#C5A059] transition-colors text-sm"
                >
                  <Mail className="w-5 h-5 text-[#C5A059]" />
                  contato@ljassessoria.com.br
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-[#9CA3AF] text-sm">
                  <MapPin className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <span>Atendimento em todo o território nacional</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#C5A059]/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#6B7280] text-sm">
              © {currentYear} LJ Assessoria de Mudança. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-[#6B7280] hover:text-[#C5A059] text-sm transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-[#6B7280] hover:text-[#C5A059] text-sm transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
