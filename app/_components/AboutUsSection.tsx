"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  MapPin,
  Target,
  Heart,
  Users,
  Shield,
  Sparkles,
  ArrowRight,
  Car,
  CheckSquare,
  ClipboardCheck,
  Gavel,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react"
import { useState, useRef } from "react"

// Dados extraídos do componente para otimização
const values = [
  {
    icon: Heart,
    title: "Paixão por Carros",
    description: "Cada veículo é escolhido com carinho e atenção aos detalhes, movidos pela paixão.",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: Shield,
    title: "Transparência Total",
    description: "Relacionamentos honestos e claros. Todos os detalhes do veículo são abertos ao cliente.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: Users,
    title: "Foco no Cliente",
    description: "Seu sonho é nossa prioridade. Trabalhamos para superar expectativas em cada etapa da jornada.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Target,
    title: "Excelência",
    description: "Buscamos a perfeição e qualidade máxima, desde a seleção do carro até o pós-venda.",
    color: "from-amber-500 to-orange-600",
  },
]

const inspectionPillars = [
  {
    icon: ClipboardCheck,
    title: "Vistoria Cautelar",
    description: "Certificação de procedência",
  },
  {
    icon: CheckSquare,
    title: "Inspeção",
    description: "Verificação minuciosa de mecânica, elétrica e estrutural para máxima segurança.",
  },
  {
    icon: Gavel,
    title: "Documentação Legal",
    description: "Documentos em dia e livres de pendências.",
  },
]

const stats = [
  { value: "50+", label: "Veículos Entregues" },
  { value: "100%", label: "Satisfação Confirmada" },
  { value: "24h", label: "Suporte Dedicado" },
]

export default function AboutUsSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVideoPlay = () => {
    setHasStarted(true)
  }

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#0F0900] via-[#1A1206] to-[#241A0B] py-20">
      
      {/* Elementos Decorativos de Fundo */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-linear-to-bl from-[#DAA520]/10 to-transparent blur-[150px]" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-linear-to-tr from-[#B8860B]/10 to-transparent blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Principal */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-3 rounded-2xl border border-[#DAA520]/30 bg-linear-to-r from-[#B8860B]/10 to-[#D4AF37]/5 p-4 backdrop-blur-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-[#B8860B] to-[#FFD700] shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-white">Sobre a VCar</h2>
              <p className="text-sm text-[#D4AF37]">Nossa confiança é sua segurança</p>
            </div>
          </motion.div>

          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Mais que uma loja, uma <span className="bg-linear-to-r from-[#B8860B] to-[#DAA520] bg-clip-text text-transparent">experiência premium</span>
          </h1>

          <p className="mx-auto max-w-3xl text-lg text-gray-400">
            Desde 2022, realizamos o sonho de ter um veículo em realidade. Nossa missão é criar conexões duradouras baseadas em **confiança e excelência**.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 mb-20">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Container do Vídeo */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#DAA520]/20 group">
              
              {/* Video Player */}
              <div className="aspect-video relative bg-black">
                <video
                  ref={videoRef}
                  src="/aboutus/aboutus.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  onPlay={handleVideoPlay}
                  preload="metadata"
                />
                
                {/* Overlay com Gradiente */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Controles do Vídeo */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Botão Play/Pause */}
                      <button
                        onClick={togglePlay}
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5 text-white" />
                        ) : (
                          <Play className="w-5 h-5 text-white" />
                        )}
                      </button>
                      
                      {/* Botão Mute/Unmute */}
                      <button
                        onClick={toggleMute}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4 text-white" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-white" />
                        )}
                      </button>
                      
                      {/* Indicador de Áudio */}
                      <span className="text-sm text-white/80 font-medium">
                        {isMuted ? "Mudo" : "Som"}
                      </span>
                    </div>
                    
                    {/* Logo Overlay */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#B8860B] to-[#FFD700] flex items-center justify-center">
                        <Car className="w-4 h-4 text-black" />
                      </div>
                      <span className="text-white font-bold text-lg">VCar</span>
                    </div>
                  </div>
                </div>
                
                {/* Play Overlay (antes do início) */}
                {!hasStarted && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <button
                      onClick={togglePlay}
                      className="flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all hover:scale-110"
                    >
                      <Play className="w-10 h-10 text-white" />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Texto sobre o vídeo */}
              <div className="absolute top-6 left-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/20">
                  <Car className="w-4 h-4 text-[#FFD700]" />
                  <span className="text-sm font-medium text-white">Tour pela vCar</span>
                </div>
              </div>
            </div>

            {/* Card de Localização */}
            <div className="rounded-2xl border-2 border-[#DAA520]/20 bg-linear-to-br from-[#1A1206] to-[#2D210F] p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#B8860B] to-[#FFD700]">
                  <MapPin className="h-6 w-6 text-gray-900" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-white">Atendimento no Espírito Santo</h3>
                  <p className="text-gray-400">
                    Atuamos em todo o ES, levando qualidade e confiança até você, onde quer que esteja.
                    <br />
                    <span className="text-[#FFD700] font-medium mt-2 inline-block">
                      Assista ao vídeo para conhecer nosso espaço!
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Coluna de Qualidade & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Stats Flutuantes */}
            <div className="grid grid-cols-3 gap-4 rounded-2xl border-2 border-[#DAA520]/20 bg-[#241A0B] p-6 shadow-xl lg:grid-cols-1 xl:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-extrabold text-[#FFD700]">{stat.value}</div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Pilares da Vistoria */}
            <div className="rounded-2xl border-2 border-[#DAA520]/20 bg-[#1A1206] p-8 shadow-xl">
              <h2 className="mb-6 text-2xl font-bold text-white">
                Segurança e Qualidade
              </h2>
              <div className="space-y-6">
                {inspectionPillars.map((pillar, index) => (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-[#FFD700] to-[#B8860B]/80">
                      <pillar.icon className="h-5 w-5 text-gray-900" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{pillar.title}</h4>
                      <p className="text-sm text-gray-400">{pillar.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Card Informativo */}
            <div className="rounded-2xl border-2 border-gray-700 bg-linear-to-br from-[#0F0900] to-[#1A1206] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-[#B8860B] to-[#FFD700]">
                  <Sparkles className="h-5 w-5 text-black" />
                </div>
                <h4 className="font-bold text-white">Experiência Imersiva</h4>
              </div>
              <p className="text-sm text-gray-400">
                Nossa loja permite que você conheça cada detalhe dos veículos, 
                mesmo à distância. Qualidade que você pode ver e sentir.
              </p>
            </div>
          </motion.div>
        </div>
        
        {/* Nossos Valores */}
        <div className="mb-20">
          <h2 className="mb-8 text-center text-3xl font-bold text-white">
            Valores que Nos Movem
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group rounded-xl border-2 border-gray-700 bg-[#1A1206] p-6 shadow-xl transition-all duration-300 hover:border-[#FFD700]/60 hover:shadow-2xl"
              >
                <div className={`mb-4 inline-flex rounded-lg p-3 bg-linear-to-br ${value.color}`}>
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 font-bold text-white">{value.title}</h3>
                <p className="text-sm text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Missão e Visão */}
        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border-2 border-[#DAA520]/30 bg-linear-to-br from-[#0F0900] to-[#1A1206] p-8"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#B8860B] to-[#FFD700]">
                <Target className="h-6 w-6 text-gray-900" />
              </div>
              <h3 className="text-2xl font-bold text-white">Nossa Missão</h3>
            </div>
            <p className="text-lg leading-relaxed text-gray-300">
              Transformar o sonho de ter um veículo em uma experiência memorável, oferecendo qualidade, 
              transparência e um atendimento que vá **além das suas expectativas**.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border-2 border-gray-700 bg-linear-to-br from-[#1A1206] to-[#2D210F] p-8 shadow-lg"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-gray-500 to-gray-400">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Nossa Visão</h3>
            </div>
            <p className="text-lg leading-relaxed text-gray-400">
              Ser referência em qualidade e confiança no mercado automotivo capixaba, reconhecidos pela 
              **excelência no atendimento** e pela satisfação duradoura dos nossos clientes.
            </p>
          </motion.div>
        </div>

        {/* CTA Final - Equipe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="relative rounded-3xl border-2 border-[#DAA520]/30 bg-linear-to-br from-[#2D210F] to-[#1A1206] p-12 text-center shadow-2xl">
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-linear-to-r from-[#B8860B]/20 to-[#FFD700]/10 p-3 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-[#B8860B] to-[#FFD700]">
                  <Car className="h-5 w-5 text-black" />
                </div>
                <span className="text-sm font-medium text-[#FFD700]">Agende sua visita</span>
              </div>

              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Conheça nossa loja
              </h2>

              <p className="mx-auto mb-8 max-w-xl text-lg text-gray-400">
                Venha nos visitar ou assista ao vídeo para conhecer nosso espaço. 
                Estamos prontos para ajudar você a encontrar o carro perfeito.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/contato"
                    className="inline-flex items-center justify-center gap-3 rounded-xl bg-linear-to-r from-[#B8860B] to-[#FFD700] px-8 py-4 text-lg font-bold text-gray-900 shadow-2xl transition-all duration-300 hover:from-[#DAA520] hover:to-[#FFD700]"
                  >
                    <Users className="h-6 w-6" />
                    Falar conosco
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </motion.div>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://wa.me/5527997597886"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-xl border-2 border-green-400 bg-transparent px-8 py-4 text-lg font-bold text-green-400 shadow-xl transition-all duration-300 hover:bg-[#DAA520]/10"
                >
                  <span>WhatsApp</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}