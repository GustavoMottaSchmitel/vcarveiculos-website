"use client"

import { motion } from "framer-motion"
import Link from "next/link"
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
  ArrowRight
} from "lucide-react"

const WhyChooseUsSection = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Garantia Total",
      description: "Vveículos com garantia e laudo técnico completo. Segurança e tranquilidade para sua compra.",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: Award,
      title: "Preço Justo Garantido",
      description: "Trabalhamos com transparência total nos preços e condições.",
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: Clock,
      title: "Processo Ágil",
      description: "Da escolha à entrega com agilidade e qualidade. Documentação rápida e desburocratizada.",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Users,
      title: "Atendimento Especial",
      description: "Especialistas dedicados para entender suas necessidades e encontrar o veículo perfeito para você.",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Car,
      title: "Veículos Selecionados",
      description: "Apenas veículos com procedência comprovada e em excelente estado de conservação.",
      color: "from-red-500 to-rose-600"
    },
    {
      icon: CheckCircle,
      title: "Pós-venda Excepcional",
      description: "Acompanhamento completo após a compra. Suporte sempre que precisar.",
      color: "from-green-500 to-emerald-600"
    }
  ]

  const stats = [
    { value: "50+", label: "Veículos Entregues", icon: Car },
    { value: "100%", label: "Clientes Satisfeitos", icon: Star },
    { value: "0%", label: "Reclamações", icon: TrendingUp },
    { value: "24h", label: "Resposta Rápida", icon: Clock }
  ]

  return (
    <section className="py-20 bg-linear-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 mb-6 p-4 bg-linear-to-r from-[#B8860B]/10 to-[#D4AF37]/5 backdrop-blur-sm rounded-2xl border border-[#DAA520]/30"
          >
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#B8860B] to-[#FFD700] flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-gray-900">Nosso Diferencial</h2>
              <p className="text-sm text-[#D4AF37]">Excelência em cada detalhe</p>
            </div>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Por que escolher a <span className="text-transparent bg-clip-text bg-linear-to-r from-[#B8860B] to-[#DAA520]">VCar Veículos</span>?
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Há mais de 2 anos transformando sonhos em realidade. Somos mais que uma concessionária, 
            somos seu parceiro confiável na jornada de encontrar o veículo perfeito.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-linear-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-[#DAA520]/20 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-linear-to-br from-[#B8860B]/10 to-[#FFD700]/5`}>
                    <stat.icon className="w-6 h-6 text-[#DAA520]" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#B8860B]">{stat.value}</div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-900">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white to-gray-50 rounded-2xl border-2 border-[#DAA520]/20 shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:border-[#DAA520]/40" />
              
              <div className="relative p-8 h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-4 rounded-xl bg-linear-to-br ${benefit.color} shadow-lg`}>
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 pt-1">{benefit.title}</h3>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {benefit.description}
                </p>
                
                <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-2 text-[#B8860B] font-semibold">
                    <span>Saiba mais</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background Gradients */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-64 h-64 bg-linear-to-br from-[#B8860B]/20 to-[#FFD700]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-linear-to-tr from-[#DAA520]/15 to-[#B8860B]/10 rounded-full blur-3xl" />
          </div>
          
          {/* Content */}
          <div className="relative bg-linear-to-br from-[#1A1206] to-[#2D210F] border-2 border-[#DAA520]/30 rounded-3xl p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-3 mb-6 p-3 bg-linear-to-r from-[#B8860B]/20 to-[#FFD700]/10 rounded-full backdrop-blur-sm">
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Pronto para encontrar seu <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFD700] to-[#B8860B]">veículo ideal</span>?
              </h2>
              
              <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
                Explore nossa seleção premium de veículos novos e seminovos. 
                Cada um cuidadosamente selecionado para oferecer qualidade, segurança e satisfação.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/galeria"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-[#B8860B] to-[#FFD700] text-gray-900 font-bold rounded-xl hover:from-[#DAA520] hover:to-[#FFD700] transition-all duration-300 shadow-2xl hover:shadow-3xl text-lg"
                  >
                    <Car className="w-6 h-6" />
                    Ver Carros Disponíveis
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
                
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#assistente"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-[#1A1206] to-[#2D210F] border-2 border-[#DAA520] text-[#FFD700] font-bold rounded-xl hover:bg-[#DAA520]/10 transition-all duration-300 shadow-xl text-lg"
                >
                  <span>Falar com Assistente agora!</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </div>
              
              <div className="mt-8 flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300 text-sm">Sem compromisso</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300 text-sm">Atendimento personalizado</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300 text-sm">Melhor preço garantido</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonial Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20"
        >
          <div className="bg-linear-to-br from-white to-gray-50 rounded-2xl border-2 border-[#DAA520]/20 p-8">
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
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm text-[#B8860B] hover:text-[#DAA520] font-semibold flex items-center gap-1"
                  >
                    Ver mais depoimentos
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
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