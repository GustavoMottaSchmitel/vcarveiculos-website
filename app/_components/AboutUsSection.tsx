"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  MapPin,
  Sparkles,
  ArrowRight,
  Car,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Users,
  Star,
  Shield,
  Target,
  Heart,
} from "lucide-react"
import { useState, useRef } from "react"

export default function AboutUsSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
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
    <section className="relative overflow-hidden bg-black py-24">
      
      {/* Elementos Decorativos de Fundo */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-[#0F0900] to-black" />
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-[#B8860B]/5 blur-[100px]" />
      <div className="absolute bottom-1/4 left-1/4 h-80 w-80 rounded-full bg-[#FFD700]/3 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Minimalista */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex flex-col items-center gap-3 mb-8"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-[#B8860B] to-[#FFD700]">
              <Car className="h-7 w-7 text-black" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Conheça a <span className="bg-linear-to-r from-[#B8860B] to-[#FFD700] bg-clip-text text-transparent">VCar</span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-xl mx-auto"
          >
            A essência de quem somos, sem complicação
          </motion.p>
        </div>

        {/* Seção Principal - Vídeo com Design Limpo */}
        <div className="mb-20">
          {/* Vídeo como Centro da Experiência */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-2xl overflow-hidden"
          >
            {/* Container do Vídeo */}
            <div className="relative aspect-video bg-black">
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
              
              {/* Overlay Sutil */}
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
              
              {/* Badge Minimalista */}
              <div className="absolute top-4 left-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm">
                  <Play className="w-3 h-3 text-[#FFD700]" />
                  <span className="text-xs font-medium text-white">Tour</span>
                </div>
              </div>
              
              {/* Controles Flutuantes */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                  {/* Botão Play/Pause */}
                  <button
                    onClick={togglePlay}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 text-white" />
                    ) : (
                      <Play className="w-4 h-4 text-white" />
                    )}
                  </button>
                  
                  {/* Separador */}
                  <div className="w-px h-4 bg-white/20" />
                  
                  {/* Botão Mute */}
                  <button
                    onClick={toggleMute}
                    className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-3 h-3 text-white/70" />
                    ) : (
                      <Volume2 className="w-3 h-3 text-white/70" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Texto de Apoio ao Vídeo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 max-w-2xl mx-auto text-center"
          >
            <h2 className="text-xl font-bold text-white mb-3">
              Nossa História em Movimento
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Conheça nosso espaço, nossa equipe e a paixão que move cada detalhe. 
              Aqui, cada veículo tem uma história, e cada cliente é único.
            </p>
          </motion.div>
        </div>

        {/* Características Essenciais - Grid Minimalista */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Localização */}
            <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="relative z-10">
                <div className="mb-4 inline-flex p-2 rounded-lg bg-[#B8860B]/10">
                  <MapPin className="w-5 h-5 text-[#FFD700]" />
                </div>
                <h3 className="font-bold text-white mb-2">Atendemos no ES</h3>
                <p className="text-sm text-gray-400">
                  Atendimento em todo o Espírito Santo, onde você estiver.
                </p>
              </div>
              <div className="absolute inset-0 bg-linear-to-br from-[#B8860B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Qualidade */}
            <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="relative z-10">
                <div className="mb-4 inline-flex p-2 rounded-lg bg-[#B8860B]/10">
                  <Shield className="w-5 h-5 text-[#FFD700]" />
                </div>
                <h3 className="font-bold text-white mb-2">Garantia de Qualidade</h3>
                <p className="text-sm text-gray-400">
                  Veículos vistoriados e com procedência garantida.
                </p>
              </div>
              <div className="absolute inset-0 bg-linear-to-br from-[#FFD700]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Atendimento */}
            <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="relative z-10">
                <div className="mb-4 inline-flex p-2 rounded-lg bg-[#B8860B]/10">
                  <Users className="w-5 h-5 text-[#FFD700]" />
                </div>
                <h3 className="font-bold text-white mb-2">Atendimento Personalizado</h3>
                <p className="text-sm text-gray-400">
                  Equipe especializada para entender sua necessidade.
                </p>
              </div>
              <div className="absolute inset-0 bg-linear-to-br from-[#B8860B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        </div>

        {/* CTA Minimalista */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Pronto para conhecer pessoalmente?
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Agende sua visita ou converse com nossa equipe
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Botão Principal */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Link
                href="/contato"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-[#B8860B] to-[#FFD700] text-black font-bold rounded-lg hover:shadow-2xl transition-all duration-300 min-w-[200px]"
              >
                <Users className="h-5 w-5" />
                Agendar Visita
              </Link>
            </motion.div>

            {/* Botão Secundário */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <a
                href="https://wa.me/5527997597886"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#FFD700] bg-transparent text-[#FFD700] font-bold rounded-lg hover:bg-[#FFD700]/10 transition-all duration-300 min-w-[200px]"
              >
                WhatsApp
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          {/* Texto de Apoio */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Heart className="w-3 h-3 text-[#B8860B]" />
                <span>Paixão por carros</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-3 h-3 text-[#B8860B]" />
                <span>Foco no cliente</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-[#B8860B]" />
                <span>Desde 2022</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}