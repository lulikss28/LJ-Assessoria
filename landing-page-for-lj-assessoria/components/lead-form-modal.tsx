'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Phone, MapPin, Loader2, CheckCircle2, Send, AlertCircle } from 'lucide-react'

interface LeadFormModalProps {
  isOpen: boolean
  onClose: () => void
}

interface AddressData {
  logradouro: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}

export function LeadFormModal({ isOpen, onClose }: LeadFormModalProps) {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    cepOrigem: '',
    cepDestino: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [addressOrigem, setAddressOrigem] = useState<AddressData | null>(null)
  const [addressDestino, setAddressDestino] = useState<AddressData | null>(null)
  const [loadingOrigem, setLoadingOrigem] = useState(false)
  const [loadingDestino, setLoadingDestino] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 2) return numbers.length ? `(${numbers}` : ''
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 5) return numbers
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`
  }

  const fetchAddress = useCallback(async (cep: string, type: 'origem' | 'destino') => {
    const cleanCEP = cep.replace(/\D/g, '')
    if (cleanCEP.length !== 8) return

    const setLoading = type === 'origem' ? setLoadingOrigem : setLoadingDestino
    const setAddress = type === 'origem' ? setAddressOrigem : setAddressDestino

    setLoading(true)
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`)
      const data: AddressData = await response.json()
      if (!data.erro) {
        setAddress(data)
        setErrors(prev => ({ ...prev, [type === 'origem' ? 'cepOrigem' : 'cepDestino']: '' }))
      } else {
        setAddress(null)
        setErrors(prev => ({ ...prev, [type === 'origem' ? 'cepOrigem' : 'cepDestino']: 'CEP não encontrado' }))
      }
    } catch {
      setAddress(null)
      setErrors(prev => ({ ...prev, [type === 'origem' ? 'cepOrigem' : 'cepDestino']: 'Erro ao buscar CEP' }))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const cleanCEP = formData.cepOrigem.replace(/\D/g, '')
    if (cleanCEP.length === 8) {
      fetchAddress(cleanCEP, 'origem')
    } else {
      setAddressOrigem(null)
    }
  }, [formData.cepOrigem, fetchAddress])

  useEffect(() => {
    const cleanCEP = formData.cepDestino.replace(/\D/g, '')
    if (cleanCEP.length === 8) {
      fetchAddress(cleanCEP, 'destino')
    } else {
      setAddressDestino(null)
    }
  }, [formData.cepDestino, fetchAddress])

  const handleChange = (field: string, value: string) => {
    let formattedValue = value
    if (field === 'whatsapp') formattedValue = formatWhatsApp(value)
    if (field === 'cepOrigem' || field === 'cepDestino') formattedValue = formatCEP(value)
    
    setFormData(prev => ({ ...prev, [field]: formattedValue }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: Record<string, string> = {}
    if (formData.nome.length < 3) newErrors.nome = 'Nome deve ter pelo menos 3 caracteres'
    if (formData.whatsapp.length < 14) newErrors.whatsapp = 'WhatsApp inválido'
    if (formData.cepOrigem.length !== 9) newErrors.cepOrigem = 'CEP inválido'
    if (formData.cepDestino.length !== 9) newErrors.cepDestino = 'CEP inválido'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (!addressOrigem || !addressDestino) {
      if (!addressOrigem) setErrors(prev => ({ ...prev, cepOrigem: 'Aguarde a validação do CEP' }))
      if (!addressDestino) setErrors(prev => ({ ...prev, cepDestino: 'Aguarde a validação do CEP' }))
      return
    }

    setIsSubmitting(true)

    const payload = {
      nome: formData.nome,
      whatsapp: formData.whatsapp,
      origem: {
        cep: formData.cepOrigem,
        logradouro: addressOrigem.logradouro,
        bairro: addressOrigem.bairro,
        cidade: addressOrigem.localidade,
        estado: addressOrigem.uf,
      },
      destino: {
        cep: formData.cepDestino,
        logradouro: addressDestino.logradouro,
        bairro: addressDestino.bairro,
        cidade: addressDestino.localidade,
        estado: addressDestino.uf,
      },
      timestamp: new Date().toISOString(),
    }

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }
      setIsSuccess(true)
      setTimeout(() => {
        const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL
        if (redirectUrl) {
          window.location.href = redirectUrl
        } else {
          onClose()
          setIsSuccess(false)
          setFormData({ nome: '', whatsapp: '', cepOrigem: '', cepDestino: '' })
          setAddressOrigem(null)
          setAddressDestino(null)
        }
      }, 2500)
    } catch {
      setErrors({ submit: 'Erro ao enviar. Tente novamente.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const AddressDisplay = ({ address, loading }: { address: AddressData | null; loading: boolean }) => {
    if (loading) {
      return (
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
          <Loader2 className="w-3 h-3 animate-spin text-gold" />
          <span>Buscando endereço...</span>
        </div>
      )
    }
    if (address) {
      return (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2 text-xs text-emerald-400 mt-2"
        >
          <CheckCircle2 className="w-3 h-3 mt-0.5 shrink-0" />
          <span className="leading-tight">
            {address.logradouro && `${address.logradouro}, `}
            {address.bairro} - {address.localidade}/{address.uf}
          </span>
        </motion.div>
      )
    }
    return null
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-lg bg-gradient-to-br from-[#0d1a35] via-[#0A1128] to-[#060c1f] border border-gold/20 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5 text-white/70" />
            </button>

            <div className="relative p-8">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15, delay: 0.1 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Solicitacao Enviada!</h3>
                  <p className="text-muted-foreground">
                    Um consultor entrara em contato pelo WhatsApp em instantes.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Solicitar Orcamento</h2>
                    <p className="text-muted-foreground text-sm">
                      Preencha os dados e receba uma proposta personalizada via WhatsApp.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Nome completo
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="text"
                          value={formData.nome}
                          onChange={e => handleChange('nome', e.target.value)}
                          placeholder="Seu nome completo"
                          className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all"
                        />
                      </div>
                      {errors.nome && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.nome}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        WhatsApp
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="tel"
                          value={formData.whatsapp}
                          onChange={e => handleChange('whatsapp', e.target.value)}
                          placeholder="(11) 99999-9999"
                          className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all"
                        />
                      </div>
                      {errors.whatsapp && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.whatsapp}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          CEP de Origem
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="text"
                            value={formData.cepOrigem}
                            onChange={e => handleChange('cepOrigem', e.target.value)}
                            placeholder="00000-000"
                            maxLength={9}
                            className="w-full pl-10 pr-3 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-sm"
                          />
                        </div>
                        {errors.cepOrigem && (
                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.cepOrigem}
                          </p>
                        )}
                        <AddressDisplay address={addressOrigem} loading={loadingOrigem} />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          CEP de Destino
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="text"
                            value={formData.cepDestino}
                            onChange={e => handleChange('cepDestino', e.target.value)}
                            placeholder="00000-000"
                            maxLength={9}
                            className="w-full pl-10 pr-3 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-sm"
                          />
                        </div>
                        {errors.cepDestino && (
                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.cepDestino}
                          </p>
                        )}
                        <AddressDisplay address={addressDestino} loading={loadingDestino} />
                      </div>
                    </div>

                    {errors.submit && (
                      <p className="text-red-400 text-sm text-center">{errors.submit}</p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-gold to-[#a88a4a] text-[#0A1128] font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-gold/25 hover:shadow-gold/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          CONFIRMAR SOLICITACAO
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
