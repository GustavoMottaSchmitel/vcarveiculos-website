"use client"

import { useState } from "react"
import { Car, DollarSign, MapPin, Users, Fuel, Cog, Phone, Mail, User, Check, CreditCard, Calendar, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

interface CarChatbotProps {
  onFilterComplete?: (filters: CarFilters) => void
  showGalleryButton?: boolean
}

export interface CarFilters {
  name: string
  phone: string
  profile: string
  budget: string
  usage: string
  fuelType: string
  transmission: string
  financing: string
  [key: string]: string
}

interface OptionBase {
  value: string
  label: string
  description: string
  icon?: React.ReactNode
}

type QuestionType = {
  id: keyof CarFilters
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  options: OptionBase[]
  isPersonalInfo?: boolean
  inputType?: string
}

const questions: QuestionType[] = [
  {
    id: 'name',
    title: 'Seu nome completo',
    subtitle: 'Para personalizarmos sua busca',
    icon: User,
    options: [],
    isPersonalInfo: true,
    inputType: 'text'
  },
  {
    id: 'phone',
    title: 'Seu telefone',
    subtitle: 'Para contato rápido',
    icon: Phone,
    options: [],
    isPersonalInfo: true,
    inputType: 'tel'
  },
  {
    id: 'profile',
    title: 'Qual é seu perfil?',
    subtitle: 'Identifique sua necessidade principal',
    icon: Users,
    options: [
      {
        value: 'familia',
        label: 'Para Família',
        description: 'Espaço, conforto e segurança',
        icon: '👨‍👩‍👧‍👦'
      },
      {
        value: 'trabalho',
        label: 'Para Trabalho',
        description: 'Robustez e economia',
        icon: '💼'
      },
      {
        value: 'primeiro-carro',
        label: 'Primeiro Carro',
        description: 'Econômico e de fácil manutenção',
        icon: '🚗'
      },
      {
        value: 'cidade',
        label: 'Uso na Cidade',
        description: 'Compacto e ágil',
        icon: '🏙️'
      }
    ]
  },
  {
    id: 'budget',
    title: 'Qual seu orçamento?',
    subtitle: 'Encontre opções dentro do seu investimento',
    icon: DollarSign,
    options: [
      {
        value: 'ate-30',
        label: 'Até R$ 30.000',
        description: 'Ótimas opções de entrada',
        icon: '💰'
      },
      {
        value: '30-50',
        label: 'R$ 30.000 - R$ 50.000',
        description: 'Equilíbrio preço/qualidade',
        icon: '💵'
      },
      {
        value: '50-80',
        label: 'R$ 50.000 - R$ 80.000',
        description: 'Veículos completos',
        icon: '💎'
      },
      {
        value: '80-120',
        label: 'R$ 80.000 - R$ 120.000',
        description: 'Seminovos excelentes',
        icon: '✨'
      }
    ]
  },
  {
    id: 'usage',
    title: 'Uso principal',
    subtitle: 'Como será utilizado?',
    icon: MapPin,
    options: [
      {
        value: 'urbano',
        label: 'Na Cidade',
        description: 'Deslocamentos diários',
        icon: '🚦'
      },
      {
        value: 'estrada',
        label: 'Viagens',
        description: 'Estrada frequente',
        icon: '🛣️'
      },
      {
        value: 'misturado',
        label: 'Uso Misto',
        description: 'Cidade e estrada',
        icon: '🔄'
      },
      {
        value: 'carregamento',
        label: 'Transporte',
        description: 'Capacidade de carga',
        icon: '📦'
      }
    ]
  },
  {
    id: 'fuelType',
    title: 'Combustível preferido',
    subtitle: 'Escolha o tipo ideal',
    icon: Fuel,
    options: [
      {
        value: 'flex',
        label: 'Flex',
        description: 'Versátil e econômico',
        icon: '⛽'
      },
      {
        value: 'gasolina',
        label: 'Gasolina',
        description: 'Performance comprovada',
        icon: '🔥'
      },
      {
        value: 'diesel',
        label: 'Diesel',
        description: 'Força e durabilidade',
        icon: '⚡'
      },
      {
        value: 'indiferente',
        label: 'Indiferente',
        description: 'Melhor custo-benefício',
        icon: '✅'
      }
    ]
  },
  {
    id: 'transmission',
    title: 'Transmissão',
    subtitle: 'Qual tipo prefere?',
    icon: Cog,
    options: [
      {
        value: 'automatico',
        label: 'Automático',
        description: 'Conforto no trânsito',
        icon: '⚙️'
      },
      {
        value: 'manual',
        label: 'Manual',
        description: 'Controle e economia',
        icon: '🎛️'
      },
      {
        value: 'indiferente',
        label: 'Indiferente',
        description: 'Opção mais vantajosa',
        icon: '✅'
      }
    ]
  },
  {
    id: 'financing',
    title: 'Condição de pagamento',
    subtitle: 'Como prefere realizar?',
    icon: CreditCard,
    options: [
      {
        value: 'sim-financiar',
        label: 'Financiamento',
        description: 'Parcelas acessíveis',
        icon: '📋'
      },
      {
        value: 'parcelar',
        label: 'Parcelamento Direto',
        description: 'Condições especiais',
        icon: '💳'
      },
      {
        value: 'a-vista',
        label: 'À Vista',
        description: 'Desconto especial',
        icon: '💰'
      },
      {
        value: 'consorcio',
        label: 'Consórcio',
        description: 'Planejamento seguro',
        icon: '📊'
      }
    ]
  }
]

// Função para converter filtros do chatbot para filtros da galeria
interface GalleryFilters {
  search: string
  tipo: string[]
  marca: string[]
  minPrice: string
  maxPrice: string
  minKm: string
  maxKm: string
  year: string
  fuel: string
  transmission: string
  sortBy: "year_desc" | "price_asc" | "price_desc" | "year_asc"
  name?: string
  phone?: string
  profile?: string
  usage?: string
  financing?: string
}

// Função para converter filtros do chatbot para filtros da galeria
const convertChatbotFiltersToGalleryFilters = (chatbotFilters: CarFilters): GalleryFilters => {
  const filters: GalleryFilters = {
    search: '',
    tipo: [],
    marca: [],
    minPrice: "",
    maxPrice: "",
    minKm: "",
    maxKm: "",
    year: "",
    fuel: "",
    transmission: "",
    sortBy: "year_desc"
  }

  // Converter perfil para tags/marcas
  if (chatbotFilters.profile) {
    switch (chatbotFilters.profile) {
      case 'familia':
        filters.marca = ['CHEVROLET', 'FIAT', 'VOLKSWAGEN']
        break
      case 'trabalho':
        filters.marca = ['FORD', 'TOYOTA']
        break
      case 'primeiro-carro':
        filters.marca = ['CHEVROLET', 'FIAT', 'RENAULT', 'VOLKSWAGEN']
        break
      case 'cidade':
        filters.marca = ['CHEVROLET', 'FIAT', 'HYUNDAI']
        break
    }
  }

  // Converter orçamento para faixa de preço
  if (chatbotFilters.budget) {
    switch (chatbotFilters.budget) {
      case 'ate-30':
        filters.maxPrice = "30000"
        break
      case '30-50':
        filters.minPrice = "30000"
        filters.maxPrice = "50000"
        break
      case '50-80':
        filters.minPrice = "50000"
        filters.maxPrice = "80000"
        break
      case '80-120':
        filters.minPrice = "80000"
        filters.maxPrice = "120000"
        break
    }
  }

  // Converter tipo de combustível
  if (chatbotFilters.fuelType) {
    switch (chatbotFilters.fuelType) {
      case 'flex':
        filters.fuel = 'Flex'
        break
      case 'gasolina':
        filters.fuel = 'Gasolina'
        break
      case 'diesel':
        filters.fuel = 'Diesel'
        break
    }
  }

  // Converter transmissão
  if (chatbotFilters.transmission) {
    switch (chatbotFilters.transmission) {
      case 'automatico':
        filters.transmission = 'Automático'
        break
      case 'manual':
        filters.transmission = 'Manual'
        break
    }
  }

  if (chatbotFilters.name) filters.name = chatbotFilters.name
  if (chatbotFilters.phone) filters.phone = chatbotFilters.phone
  if (chatbotFilters.profile) filters.profile = chatbotFilters.profile
  if (chatbotFilters.usage) filters.usage = chatbotFilters.usage
  if (chatbotFilters.financing) filters.financing = chatbotFilters.financing

  return filters
}

export function CarChatbot({ onFilterComplete, showGalleryButton = true }: CarChatbotProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<CarFilters>({
    name: '',
    phone: '',
    profile: '',
    budget: '',
    usage: '',
    fuelType: '',
    transmission: '',
    financing: ''
  })

  const currentQuestion = questions[currentStep]
  const isLastStep = currentStep === questions.length - 1
  const IconComponent = currentQuestion.icon

  const handleOptionClick = (value: string) => {
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: value
    }

    setAnswers(newAnswers)

    if (isLastStep) {
      setTimeout(() => {
        if (onFilterComplete) {
          onFilterComplete(newAnswers)
        }
      }, 500)
    } else {
      setTimeout(() => {
        setCurrentStep(currentStep + 1)
      }, 300)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAnswers(prev => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    if (currentQuestion.isPersonalInfo && answers[currentQuestion.id]) {
      setCurrentStep(currentStep + 1)
    } else if (!currentQuestion.isPersonalInfo) {
      if (answers[currentQuestion.id]) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = ((currentStep + 1) / questions.length) * 100

  const getPlaceholder = (id: keyof CarFilters) => {
    switch (id) {
      case 'name': return 'Digite seu nome completo'
      case 'phone': return '(11) 99999-9999'
      default: return ''
    }
  }

  // Converter CarFilters para query string para a galeria
  const getQueryParams = () => {
    const galleryFilters = convertChatbotFiltersToGalleryFilters(answers)

    const params: Record<string, string> = {}

    // Adicionar filtros convertidos
    Object.entries(galleryFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          params[key] = value.join(',')
        }
      } else if (value && value !== "") {
        params[key] = value.toString()
      }
    })

    return params
  }

  return (
    <section id="assistente" className="min-h-screen flex items-center justify-center px-4 py-12 md:py-20 bg-linear-to-br from-[#0F0900] via-[#1A1206] to-[#241A0B] relative overflow-hidden">

      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-linear-to-br from-[#D4AF37]/20 to-[#FFD700]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-linear-to-tr from-[#B8860B]/15 to-[#D4AF37]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-linear-to-r from-[#B8860B]/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Header elegante com dourado */}
        <div className="text-center mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center gap-3 mb-6 p-4 bg-linear-to-r from-[#B8860B]/10 to-[#D4AF37]/5 backdrop-blur-sm rounded-2xl border border-[#DAA520]/30"
          >
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#B8860B] to-[#FFD700] flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-white">Assistente de Escolha Inteligente</h2>
              <p className="text-sm text-[#D4AF37]">Encontre seu veículo ideal</p>
            </div>
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Encontre o veículo perfeito para você
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Em poucos passos, selecionamos as melhores opções para suas necessidades
          </p>
        </div>

        {/* Progress Bar com dourado */}
        <div className="max-w-2xl mx-auto mb-8 md:mb-10">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[#D4AF37] text-sm font-medium">
              Passo {currentStep + 1} de {questions.length}
            </span>
            <span className="text-gray-300 text-sm font-medium">
              {Math.round(progress)}% completo
            </span>
          </div>

          <div className="h-2 bg-[#241A0B] rounded-full overflow-hidden border border-[#DAA520]/20">
            <motion.div
              className="h-full bg-linear-to-r from-[#B8860B] via-[#D4AF37] to-[#FFD700] rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Main Card com tema dourado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-linear-to-br from-[#241A0B] to-[#2D210F] rounded-2xl shadow-2xl border border-[#DAA520]/40 overflow-hidden mb-8"
        >
          {/* Card Header com gradiente dourado */}
          <div className="bg-linear-to-r from-[#B8860B]/20 to-[#D4AF37]/10 px-6 py-4 border-b border-[#DAA520]/30">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#B8860B] to-[#FFD700] flex items-center justify-center shadow-md">
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{currentQuestion.title}</h2>
                <p className="text-[#D4AF37] text-sm">{currentQuestion.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6 md:p-8">
            {currentQuestion.isPersonalInfo ? (
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type={currentQuestion.inputType}
                    name={currentQuestion.id as string}
                    value={answers[currentQuestion.id] || ''}
                    onChange={handleInputChange}
                    placeholder={getPlaceholder(currentQuestion.id)}
                    className="w-full px-4 py-3 pl-12 bg-[#1A1206] border border-[#DAA520]/30 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] outline-none transition-all text-white placeholder-gray-500"
                    required
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <IconComponent className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                </div>

                {/* Value Preview com dourado */}
                {answers[currentQuestion.id] && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-linear-to-r from-[#1A1206] to-[#241A0B] border border-[#DAA520]/20 rounded-lg"
                  >
                    <p className="text-sm text-gray-400 mb-1">Você digitou:</p>
                    <p className="text-[#FFD700] font-medium">{answers[currentQuestion.id]}</p>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNextStep}
                  disabled={!answers[currentQuestion.id]}
                  className="w-full py-3 bg-linear-to-r from-[#B8860B] to-[#FFD700] text-gray-900 font-semibold rounded-lg hover:from-[#A07509] hover:to-[#E6C300] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuar
                </motion.button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = answers[currentQuestion.id as keyof CarFilters] === option.value

                  return (
                    <motion.button
                      key={option.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleOptionClick(option.value)}
                      className={`p-4 text-left rounded-xl border transition-all duration-300 relative overflow-hidden group ${isSelected
                        ? 'border-[#FFD700] bg-linear-to-br from-[#B8860B]/10 to-[#D4AF37]/5 shadow-lg'
                        : 'border-[#DAA520]/20 hover:border-[#FFD700]/50 hover:bg-linear-to-br from-[#B8860B]/5 to-transparent'
                        }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3">
                          <div className="w-6 h-6 rounded-full bg-linear-to-r from-[#B8860B] to-[#FFD700] flex items-center justify-center shadow-md">
                            <Check className="w-3 h-3 text-gray-900" />
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-3">
                        <div className={`text-2xl ${isSelected ? 'text-[#FFD700]' : 'text-gray-400'}`}>
                          {option.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold mb-1 ${isSelected ? 'text-[#FFD700]' : 'text-white'
                            }`}>
                            {option.label}
                          </h3>
                          <p className="text-sm text-gray-300 leading-relaxed">
                            {option.description}
                          </p>
                        </div>
                      </div>

                      {/* Hover effect com brilho dourado */}
                      <div className="absolute inset-0 bg-linear-to-br from-[#FFD700]/0 to-[#B8860B]/0 group-hover:from-[#FFD700]/5 group-hover:to-[#B8860B]/5 transition-all duration-300" />
                    </motion.button>
                  )
                })}
              </div>
            )}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 max-w-2xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevStep}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-lg border font-medium transition-all ${currentStep === 0
              ? 'text-gray-600 border-gray-700 cursor-not-allowed'
              : 'text-gray-300 border-[#DAA520]/40 hover:border-[#FFD700] hover:text-[#FFD700] hover:bg-linear-to-r from-[#B8860B]/5 to-transparent'
              }`}
          >
            ← Voltar
          </motion.button>

          {/* Step Indicator Dots dourados */}
          <div className="flex items-center gap-2">
            {questions.map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`w-2 h-2 rounded-full transition-all ${index === currentStep
                  ? 'bg-linear-to-r from-[#B8860B] via-[#D4AF37] to-[#FFD700]'
                  : index < currentStep
                    ? 'bg-[#D4AF37]'
                    : 'bg-[#241A0B] border border-[#DAA520]/20'
                  }`}
              />
            ))}
          </div>

          {/* Next/Finish Buttons */}
          {!currentQuestion.isPersonalInfo && answers[currentQuestion.id] && !isLastStep && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-8 py-3 bg-linear-to-r from-[#B8860B] to-[#FFD700] text-gray-900 font-semibold rounded-lg hover:from-[#A07509] hover:to-[#E6C300] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <span>Próximo</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          )}

          {isLastStep && showGalleryButton && Object.values(answers).every(value => value) && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={{
                  pathname: '/galeria',
                  query: getQueryParams()
                }}
                className="px-8 py-3 bg-linear-to-r from-[#18803A] to-[#22C55E] text-white font-semibold rounded-lg hover:from-[#166534] hover:to-[#16A34A] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <span>Ver Veículos Recomendados</span>
                <Car className="w-5 h-5" />
              </Link>
            </motion.div>
          )}
        </div>

        {/* Summary Preview com tema dourado */}
        {Object.values(answers).filter(value => value).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 bg-linear-to-br from-[#241A0B] to-[#2D210F] border border-[#DAA520]/40 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded-full bg-linear-to-r from-[#B8860B] to-[#FFD700] flex items-center justify-center">
                <Check className="w-3 h-3 text-gray-900" />
              </div>
              <h4 className="text-lg font-semibold text-white">Suas preferências</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(answers)
                .filter(([value]) => value)
                .map(([key, value], index) => {
                  const question = questions.find(q => q.id === key)
                  const option = question?.options?.find(opt => opt.value === value)

                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 bg-linear-to-br from-[#1A1206] to-[#241A0B] border border-[#DAA520]/20 rounded-lg hover:border-[#FFD700]/30 transition-colors"
                    >
                      <div className="text-xs text-[#D4AF37] uppercase tracking-wide mb-1">
                        {question?.title || key}
                      </div>
                      <div className="text-sm text-white font-medium">
                        {option?.label || value}
                      </div>
                    </motion.div>
                  )
                })}
            </div>
          </motion.div>
        )}

        {/* Trust Badges dourados */}
        <div className="mt-12 pt-8 border-t border-[#DAA520]/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="text-center p-4 bg-linear-to-br from-[#241A0B] to-[#2D210F] border border-[#DAA520]/30 rounded-xl hover:border-[#FFD700]/50 transition-all"
            >
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-linear-to-br from-[#B8860B] to-[#FFD700] flex items-center justify-center">
                <Check className="w-5 h-5 text-gray-900" />
              </div>
              <h5 className="font-semibold text-white mb-1">Procedência Garantida</h5>
              <p className="text-sm text-gray-300">Histórico completo e verificado</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="text-center p-4 bg-linear-to-br from-[#241A0B] to-[#2D210F] border border-[#DAA520]/30 rounded-xl hover:border-[#FFD700]/50 transition-all"
            >
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-linear-to-br from-[#B8860B] to-[#FFD700] flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-gray-900" />
              </div>
              <h5 className="font-semibold text-white mb-1">Financiamento Facilitado</h5>
              <p className="text-sm text-gray-300">Diversas condições de pagamento</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="text-center p-4 bg-linear-to-br from-[#241A0B] to-[#2D210F] border border-[#DAA520]/30 rounded-xl hover:border-[#FFD700]/50 transition-all"
            >
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-linear-to-br from-[#B8860B] to-[#FFD700] flex items-center justify-center">
                <Calendar className="w-5 h-5 text-gray-900" />
              </div>
              <h5 className="font-semibold text-white mb-1">Processo Ágil</h5>
              <p className="text-sm text-gray-300">Atendimento rápido e eficiente</p>
            </motion.div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Seus dados estão protegidos.{" "}
            <span className="text-[#D4AF37] font-medium">Privacidade garantida.</span>
          </p>
        </div>
      </div>
    </section>
  )
}