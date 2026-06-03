'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { ServicesSection } from '@/components/services-section'
import { CoverageSection } from '@/components/coverage-section'
import { ProcessSection } from '@/components/process-section'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { LeadFormModal } from '@/components/lead-form-modal'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <main className="min-h-screen">
      <Header onOpenModal={openModal} />
      <HeroSection onOpenModal={openModal} />
      <ServicesSection />
      <CoverageSection onOpenModal={openModal} />
      <ProcessSection />
      <Footer />
      <WhatsAppButton />
      <LeadFormModal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  )
}
