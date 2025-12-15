"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle,
  User,
  Mail,
  FileText,
  Building,
  Smartphone,
  Car
} from "lucide-react"

const COMPANY_INFO = {
  name: "VCar Veículos",
  phone: "(27) 99759-7886",
  whatsapp: "5527997597886",
  email: "vcar062024@gmail.com",
  address: {
    street: "Av. Norte Sul, 1064",
    district: "Jardim Limoeiro",
    city: "Serra - ES",
    cep: "29164-044",
    full: "Av. Norte Sul, 1064 - Jardim Limoeiro, Serra - ES, 29164-044",
    coordinates: {
      lat: -20.1277,
      lng: -40.2956
    }
  },
  cnpj: "50.982.236/0001-49",
  schedule: "Segunda a Sexta: 8h às 18h"
} as const

const INTEREST_OPTIONS = {
  informacoes: "Informações sobre veículos",
  orcamento: "Orçamento/Financiamento",
  outros: "Outros assuntos"
} as const

type FormData = {
  name: string
  email: string
  phone: string
  message: string
  interest: keyof typeof INTEREST_OPTIONS
}

type FormErrors = Partial<Record<keyof FormData, string>>

const cardVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 }
}

const formatPhoneNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, '').slice(0, 11)
  
  if (numbers.length === 0) return ''
  if (numbers.length <= 2) return `(${numbers}`
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
  
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
}

const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {}
  
  if (!formData.name.trim()) {
    errors.name = "Nome é obrigatório"
  }
  
  if (!formData.phone.trim()) {
    errors.phone = "Telefone é obrigatório"
  } else if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(formData.phone)) {
    errors.phone = "Formato inválido (00) 00000-0000"
  }
  
  return errors
}

const CompanyInfoCard = () => (
  <div className="bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-2xl overflow-hidden border-2 border-amber-500/20">
    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <Building className="w-7 h-7 text-amber-600" />
        {COMPANY_INFO.name}
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-600/20 to-yellow-400/10 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Endereço</p>
            <p className="text-gray-600">
              {COMPANY_INFO.address.street}<br />
              {COMPANY_INFO.address.district}, {COMPANY_INFO.address.city}<br />
              CEP: {COMPANY_INFO.address.cep}
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-600/20 to-yellow-400/10 flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">CNPJ</p>
            <p className="text-gray-600 font-mono">{COMPANY_INFO.cnpj}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const ContactInfoCard = () => (
  <div className="bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border-2 border-amber-500/20">
    <h3 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-amber-500/20">
      Como nos encontrar
    </h3>
    
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-linear-to-br from-amber-600 to-yellow-500 flex items-center justify-center shrink-0 shadow-lg">
          <Phone className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="font-bold text-gray-900 text-lg">WhatsApp</p>
          <a 
            href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-amber-600 transition-colors text-lg font-semibold block mt-1"
          >
            {COMPANY_INFO.phone}
          </a>
          <p className="text-gray-500 text-sm mt-1">Clique para conversar</p>
        </div>
      </div>
      
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-linear-to-br from-amber-600 to-yellow-500 flex items-center justify-center shrink-0 shadow-lg">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="font-bold text-gray-900 text-lg">E-mail</p>
          <a 
            href={`mailto:${COMPANY_INFO.email}`}
            className="text-gray-600 hover:text-amber-600 transition-colors text-lg font-semibold block mt-1"
          >
            {COMPANY_INFO.email}
          </a>
          <p className="text-gray-500 text-sm mt-1">Respondemos em até 24h</p>
        </div>
      </div>
      
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-linear-to-br from-amber-600 to-yellow-500 flex items-center justify-center shrink-0 shadow-lg">
          <Clock className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="font-bold text-gray-900 text-lg">Horário de Funcionamento</p>
          <div className="mt-1">
            <p className="text-gray-600 font-semibold">{COMPANY_INFO.schedule}</p>
            <p className="text-gray-500 text-sm mt-1">Atendimento presencial e online</p>
          </div>
        </div>
      </div>
    </div>
    
    <motion.a
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-8 w-full py-4 bg-linear-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-lg"
    >
      <MessageCircle className="w-6 h-6" />
      Falar no WhatsApp Agora
    </motion.a>
  </div>
)

const MapCard = () => {
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(COMPANY_INFO.address.full)}&zoom=15`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(COMPANY_INFO.address.full)}`

  return (
    <div id="localizacao" className="bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden border-2 border-amber-500/20">
      <div className="h-64 relative">
        <iframe
          src={googleMapsUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
      </div>
      
      <div className="p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-3">Nossa Localização</h4>
        <p className="text-gray-600 mb-4">
          Estamos localizados na Serra, Espírito Santo, prontos para atender você!
        </p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors"
        >
          <MapPin className="w-4 h-4" />
          Ver no Google Maps
        </motion.a>
      </div>
    </div>
  )
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    interest: "informacoes"
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setFormData(prev => ({ ...prev, phone: formatted }))
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: "" }))
    }
  }, [errors.phone])

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }, [errors])

  const handleSubmit = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    
    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    
    const message = `*NOVO CONTATO - ${COMPANY_INFO.name}*%0A%0A` +
      `*👤 Nome:* ${formData.name}%0A` +
      `*📞 Telefone:* ${formData.phone}%0A` +
      (formData.email ? `*📧 E-mail:* ${formData.email}%0A` : "") +
      `*🎯 Interesse:* ${INTEREST_OPTIONS[formData.interest]}%0A` +
      (formData.message ? `*💬 Mensagem:*%0A${formData.message}%0A%0A` : "%0A") +
      `---%0A` +
      `*🏢 Empresa:* ${COMPANY_INFO.name}%0A` +
      `*📍 Endereço:* ${COMPANY_INFO.address.full}%0A` +
      `*📄 CNPJ:* ${COMPANY_INFO.cnpj}`
    
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${message}`, '_blank')
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      interest: "informacoes"
    })
    setErrors({})
  }, [formData])

  return (
    <div className="bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-8 border-2 border-amber-500/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            Enviar para WhatsApp
          </h3>
          <p className="text-gray-600">
            Preencha e será direcionado automaticamente
          </p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nome Completo *
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
              className={`w-full pl-12 pr-4 py-3 bg-white border-2 ${
                errors.name 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-amber-500/30 focus:border-amber-600'
              } rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-600/20 transition-all`}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              E-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-amber-500/30 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600 transition-all"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Telefone *
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="(27) 99999-9999"
                className={`w-full pl-12 pr-4 py-3 bg-white border-2 ${
                  errors.phone 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-amber-500/30 focus:border-amber-600'
                } rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-600/20 transition-all`}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Qual seu interesse?
          </label>
          <div className="relative">
            <Car className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
            <select
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-amber-500/30 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600 transition-all appearance-none"
            >
              {Object.entries(INTEREST_OPTIONS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Mensagem (opcional)
          </label>
          <div className="relative">
            <FileText className="absolute left-4 top-4 w-5 h-5 text-amber-600" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Descreva sua dúvida ou solicitação..."
              rows={4}
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-amber-500/30 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600 transition-all resize-none"
            />
          </div>
        </div>
        
        <div className="bg-linear-to-r from-amber-600/5 to-yellow-400/5 border border-amber-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <MessageCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-gray-900 mb-1">Como funciona?</p>
              <p className="text-sm text-gray-600">
                Ao clicar em ´Enviar para WhatsApp´, você será redirecionado para nosso WhatsApp com todas as informações preenchidas prontas para envio.
              </p>
            </div>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          className="w-full py-4 bg-linear-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
          Enviar para WhatsApp
        </motion.button>
        
        <p className="text-xs text-gray-500 text-center">
          Seu contato será direcionado para nosso WhatsApp comercial.
          Horário de resposta: {COMPANY_INFO.schedule}.
        </p>
      </div>
    </div>
  )
}

const QuickTips = () => (
  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="p-4 bg-linear-to-br from-amber-600/5 to-yellow-400/5 border border-amber-500/20 rounded-xl">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
          <MessageCircle className="w-4 h-4 text-green-600" />
        </div>
        <p className="font-semibold text-gray-900">Resposta Imediata</p>
      </div>
      <p className="text-sm text-gray-600">
        Via WhatsApp recebemos e respondemos em tempo real durante o horário comercial.
      </p>
    </div>
    
    <div className="p-4 bg-linear-to-br from-amber-600/5 to-yellow-400/5 border border-amber-500/20 rounded-xl">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-amber-600/10 flex items-center justify-center">
          <Clock className="w-4 h-4 text-amber-600" />
        </div>
        <p className="font-semibold text-gray-900">Agilidade</p>
      </div>
      <p className="text-sm text-gray-600">
        Processo mais rápido direto pelo WhatsApp, sem necessidade de esperar por e-mail.
      </p>
    </div>
  </div>
)

const ContactSection = () => {
  return (
    <section id="contato" className="py-20 bg-linear-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6 p-4 bg-linear-to-r from-amber-600/10 to-yellow-400/5 backdrop-blur-sm rounded-2xl border border-amber-500/30"
          >
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-amber-600 to-yellow-500 flex items-center justify-center shadow-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-gray-900">Contato Direto</h2>
              <p className="text-sm text-amber-600">Fale conosco pelo WhatsApp</p>
            </div>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Fale <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-amber-500">Direto</span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Preencha o formulário e será redirecionado automaticamente para nosso WhatsApp com todas as informações.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            variants={cardVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <CompanyInfoCard />
            <ContactInfoCard />
            <MapCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <ContactForm />
            <QuickTips />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection