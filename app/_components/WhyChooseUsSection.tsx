"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { 
  Shield, 
  Award, 
  Clock, 
  Users, 
  Car, 
  CheckCircle, 
  Star,
  TrendingUp,
  Sparkles,
  ArrowRight,
  MessageCircle
} from "lucide-react"

const WhyChooseUsSection = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Garantia Total",
      description: "Veículos com garantia e laudo técnico completo.",
      color: "from-emerald-500 to-teal-600",
      image: "/whychooseus/garantia.jpg"
    },
    {
      icon: Award,
      title: "Preço Justo",
      description: "Transparência total nos preços e condições.",
      color: "from-amber-500 to-orange-600",
      image: "/whychooseus/balanca.jpg"
    },
    {
      icon: Clock,
      title: "Processo Ágil",
      description: "Documentação rápida e desburocratizada.",
      color: "from-blue-500 to-cyan-600",
      image: "/whychooseus/workflow.jpg"
    },
    {
      icon: Users,
      title: "Atendimento Especial",
      description: "Especialistas para encontrar o veículo perfeito.",
      color: "from-purple-500 to-pink-600",
      image: "/whychooseus/customerservice.jpg"
    },
    {
      icon: Car,
      title: "Veículos Selecionados",
      description: "Procedência comprovada e excelente estado.",
      color: "from-red-500 to-rose-600",
      image: "/whychooseus/car-inspection.jpg"
    },
    {
      icon: CheckCircle,
      title: "Pós-venda Excepcional",
      description: "Acompanhamento completo após a compra.",
      color: "from-green-500 to-emerald-600",
      image: "/whychooseus/customersatisfaction.jpg"
    }
  ]

  const stats = [
    { value: "50+", label: "Veículos Entregues", icon: Car, color: "from-[#B8860B] to-[#FFD700]" },
    { value: "100%", label: "Clientes Satisfeitos", icon: Star, color: "from-emerald-500 to-green-600" },
    { value: "0%", label: "Reclamações", icon: TrendingUp, color: "from-blue-500 to-cyan-600" },
    { value: "24h", label: "Resposta Rápida", icon: Clock, color: "from-purple-500 to-pink-600" }
  ]

  return (
    <section className="relative py-20 bg-linear-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-linear-to-bl from-[#FFD700]/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-linear-to-tr from-[#B8860B]/5 to-transparent rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Visual Hero */}
        <div className="relative mb-16">
          <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden mb-8">
            <Image
              src="/whychooseus/1.jpg"
              alt="VCar Veículos - Concessionária Premium"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-3 mb-6 p-4 bg-linear-to-r from-[#B8860B]/20 to-[#D4AF37]/10 backdrop-blur-sm rounded-2xl border border-[#DAA520]/30"
                >
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#B8860B] to-[#FFD700] flex items-center justify-center shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-xl font-bold text-white">Nosso Diferencial</h2>
                    <p className="text-sm text-[#FFD700]">Excelência em cada detalhe</p>
                  </div>
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Por que escolher a <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFD700] to-[#DAA520]">VCar Veículos</span>?
                </h1>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Há mais de 2 anos transformando sonhos em realidade. Somos mais que uma concessionária, 
                somos seu parceiro confiável na jornada de encontrar o veículo perfeito.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#B8860B]/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-[#B8860B]" />
                  <span className="text-gray-700">Atendimento Personalizado</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#B8860B]/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-[#B8860B]" />
                  <span className="text-gray-700">Garantia de Satisfação</span>
                </div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-64 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/whychooseus/why.jpg"
                alt="Showroom VCar"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* Stats with Visual Cards */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group overflow-hidden rounded-2xl bg-white border-2 border-[#DAA520]/10 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-linear-to-br ${stat.color} shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-linear-to-br bg-clip-text text-transparent from-[#B8860B] to-[#DAA520]">
                      {stat.value}
                    </div>
                    <p className="font-semibold text-gray-900 mt-2">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits Grid with Images */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nossos <span className="text-transparent bg-clip-text bg-linear-to-r from-[#B8860B] to-[#DAA520]">Principais Diferenciais</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubra por que somos a escolha certa para sua próxima aquisição
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl bg-white border-2 border-[#DAA520]/10 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 relative h-48 md:h-auto">
                    <Image
                      src={benefit.image}
                      alt={benefit.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className={`p-3 rounded-xl bg-linear-to-br ${benefit.color} shadow-lg`}>
                        <benefit.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {benefit.description}
                    </p>
                    <div className="flex items-center gap-2 text-[#B8860B] font-semibold group-hover:gap-3 transition-all duration-300">
                      <span>Saiba mais</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Single Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="bg-linear-to-br from-white to-gray-50 rounded-2xl border-2 border-[#DAA520]/20 p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-2/3">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
                  ))}
                </div>
                <blockquote className="text-2xl font-bold text-gray-900 mb-4">
                  Comprei meu primeiro carro na VCar e a experiência foi excepcional. 
                  Atendimento personalizado e todo suporte que precisei!
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#B8860B] to-[#FFD700] flex items-center justify-center">
                    <span className="text-white font-bold">JC</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">João Carlos</p>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/3 text-center">
                <div className="inline-flex flex-col items-center gap-4">
                  <div className="text-5xl font-bold text-[#B8860B]">4.9</div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
                    ))}
                  </div>
                  <p className="text-gray-600">Média de avaliações</p>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#depoimentos"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-[#B8860B] to-[#FFD700] text-white font-semibold rounded-xl hover:from-[#DAA520] hover:to-[#FFD700] transition-all duration-300 shadow-lg"
                  >
                    Ver mais depoimentos
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Single CTA Section */}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="relative overflow-hidden rounded-3xl"
        >

          {/* Background Image */}

          <div className="absolute inset-0">
            <Image
              src="/whychooseus/car.jpg"
              alt="Carro premium"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#1A1206]/95 via-[#1A1206]/90 to-[#2D210F]/85" />
          </div>
          
          {/* Content */}
          <div className="relative p-12 text-center">
            <div className="max-w-xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Pronto para encontrar seu <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFD700] to-[#B8860B]">veículo ideal</span>?
              </h2>
              
              <p className="text-gray-300 text-lg mb-8">
                Fale com nosso assistente virtual e descubra as melhores opções para você
              </p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <a
                  href="#assistente"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-linear-to-r from-[#B8860B] to-[#FFD700] text-gray-900 font-bold rounded-xl hover:from-[#DAA520] hover:to-[#FFD700] transition-all duration-300 shadow-2xl hover:shadow-3xl text-lg w-full sm:w-auto"
                >
                  <MessageCircle className="w-6 h-6" />
                  Falar com Assistente Agora
                  <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>
              
              <div className="mt-8 flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300 text-sm">Atendimento 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300 text-sm">Sem compromisso</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300 text-sm">Resposta imediata</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection