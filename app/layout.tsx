import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LJ Assessoria de Mudança | Mudanças de Luxo e Logística Premium',
  description: 'Assessoria premium para mudanças residenciais e corporativas em todo o Brasil. Gestão total de logística, embalagem e transporte para clientes de alto padrão.',
  keywords: ['Mudanças de Luxo', 'Assessoria de Mudança Nacional', 'Logística Residencial Premium', 'Mudança Premium Brasil', 'Concierge de Mudanças'],
  authors: [{ name: 'LJ Assessoria de Mudança' }],
  creator: 'LJ Assessoria de Mudança',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://ljassessoria.com.br',
    siteName: 'LJ Assessoria de Mudança',
    title: 'LJ Assessoria de Mudança | Mudanças de Luxo em Todo Brasil',
    description: 'Sua mudança em qualquer lugar do Brasil, sem mover um dedo. Assessoria completa para mudanças de alto padrão.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LJ Assessoria de Mudança | Mudanças de Luxo',
    description: 'Assessoria premium para mudanças residenciais e corporativas em todo o Brasil.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#0A1128',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} bg-[#0A1128]`}>
      <body className="font-sans antialiased bg-[#0A1128] text-white">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
