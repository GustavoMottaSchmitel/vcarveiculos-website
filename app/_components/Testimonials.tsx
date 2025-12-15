"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Instagram,
  Camera,
  Pause,
  Play,
} from "lucide-react"

const testimonialPhotos = [
  { id: 1, image: "/depoimentos/depoimento1.png" },
  { id: 2, image: "/depoimentos/depoimento2.png" },
  { id: 3, image: "/depoimentos/depoimento3.png" },
  { id: 4, image: "/depoimentos/depoimento4.png" },
  { id: 5, image: "/depoimentos/depoimento5.png" },
  { id: 6, image: "/depoimentos/depoimento6.png" },
  { id: 7, image: "/depoimentos/depoimento7.png" },
  { id: 8, image: "/depoimentos/depoimento8.png" },
  { id: 9, image: "/depoimentos/depoimento9.png" },
  { id: 10, image: "/depoimentos/depoimento10.png" },
  { id: 11, image: "/depoimentos/depoimento11.png" },
  { id: 12, image: "/depoimentos/depoimento12.png" },
]

const AUTOPLAY_DELAY = 4000 // 4 segundos

export default function TestimonialsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const maxIndex = testimonialPhotos.length - 1

  // Navegação
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1))
  }, [maxIndex])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1))
  }, [maxIndex])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    // Se o usuário interagir, pausamos o autoplay
    setIsAutoPlaying(false) 
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => !prev)
  }

  // Efeito de Auto-Play
  useEffect(() => {
    if (!isAutoPlaying || testimonialPhotos.length === 0) return

    const interval = setInterval(nextSlide, AUTOPLAY_DELAY)

    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  if (testimonialPhotos.length === 0) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-linear-to-b from-[#0F0900] via-[#1A1206] to-[#241A0B]">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-[#B8860B] to-[#FFD700]">
            <Camera className="h-10 w-10 text-white" />
          </div>
          <h2 className="mb-4 text-2xl font-bold text-white">Galeria vazia</h2>
        </div>
      </section>
    )
  }

  return (
    <section id="depoimentos" className="min-h-screen bg-linear-to-b from-[#0F0900] via-[#1A1206] to-[#241A0B] py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header da Seção */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 rounded-2xl border border-[#DAA520]/30 bg-linear-to-r from-[#B8860B]/10 to-[#D4AF37]/5 p-4 backdrop-blur-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-[#B8860B] to-[#FFD700] shadow-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-white">Nossos Clientes</h2>
              <p className="text-sm text-[#D4AF37]">A prova da nossa excelência</p>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-gray-400"
          >
            Confira alguns dos momentos especiais de entrega da chave.
          </motion.p>
        </div>

        {/* Layout Principal: Carrossel e Miniaturas */}
        <div className="mx-auto max-w-4xl">
          <div className="relative">
            {/* Carrossel Principal */}
            <div className="relative h-[60vh] max-h-[700px] overflow-hidden rounded-2xl border-2 border-[#DAA520]/30 bg-black shadow-2xl md:h-[70vh]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={testimonialPhotos[currentIndex].image}
                      alt={`Depoimento ${currentIndex + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={currentIndex < 3}
                    />

                    {/* Contador Superior */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 backdrop-blur-sm">
                        <Camera className="h-4 w-4 text-white/80" />
                        <span className="text-sm font-semibold text-white">
                          {currentIndex + 1}/{testimonialPhotos.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controles de Navegação (Esquerda/Direita) */}
              <motion.button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-all hover:bg-black/80 md:h-12 md:w-12"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </motion.button>

              <motion.button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-all hover:bg-black/80 md:h-12 md:w-12"
                aria-label="Próxima foto"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </motion.button>

              {/* Controle de Auto-Play */}
              <button
                onClick={toggleAutoPlay}
                className="absolute top-4 left-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#B8860B]/80 backdrop-blur-sm transition-all hover:bg-[#FFD700]"
                aria-label={isAutoPlaying ? "Pausar carrossel" : "Reproduzir carrossel"}
              >
                {isAutoPlaying ? (
                  <Pause className="h-5 w-5 text-gray-900" />
                ) : (
                  <Play className="h-5 w-5 text-gray-900" />
                )}
              </button>
            </div>

            {/* Indicadores de Posição (Dots) */}
            <div className="mt-4 flex justify-center gap-2">
              {testimonialPhotos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-linear-to-r from-[#B8860B] to-[#FFD700]"
                      : "w-2 bg-gray-600 hover:bg-gray-500"
                  }`}
                  aria-label={`Ir para foto ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Miniaturas de Navegação (Scrollable Thumbnail Bar) */}
          <div className="mt-6">
            <div className="scrollbar-hide flex overflow-x-auto gap-2 pb-2">
              {testimonialPhotos.map((photo, index) => (
                <motion.button
                  key={photo.id}
                  onClick={() => goToSlide(index)}
                  className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all md:h-20 md:w-20 ${
                    index === currentIndex
                      ? "scale-105 border-[#FFD700] shadow-lg"
                      : "border-gray-700 hover:border-[#B8860B]"
                  }`}
                  aria-label={`Ver foto ${index + 1}`}
                >
                  <Image
                    src={photo.image}
                    alt={`Miniatura ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                  {/* Destaque Visual no Thumbnail Ativo */}
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-linear-to-br from-[#FFD700]/20 to-transparent ring-2 ring-inset ring-[#FFD700]" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA 1: Instagram (Siga nosso Instagram) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="mx-auto inline-flex max-w-md flex-col items-center gap-4 rounded-2xl border-2 border-[#DAA520]/30 bg-linear-to-r from-[#1A1206] to-[#2D210F] p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-[#B8860B] to-[#FFD700]">
              <Instagram className="h-8 w-8 text-gray-900" />
            </div>
            <div>
              <h3 className="mb-2 text-xl font-bold text-white">Siga nosso Instagram</h3>
              <p className="text-gray-300">
                Veja mais momentos de entrega e novidades exclusivas em nosso perfil.
              </p>
            </div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.instagram.com/vcarveiculos.es/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-linear-to-r from-[#E1306C] to-[#C13584] px-6 py-3 text-base font-bold text-white transition-opacity hover:opacity-90"
            >
              <Instagram className="h-5 w-5" />
              @vcarveiculos.es
            </motion.a>
          </div>
        </motion.div>

        {/* CTA 2: Convite para o Próximo Cliente */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <div className="mx-auto max-w-md rounded-2xl border border-[#DAA520]/30 bg-linear-to-r from-[#B8860B]/10 to-[#FFD700]/5 p-8">
            <h3 className="mb-3 text-xl font-bold text-white">
              Quer fazer parte da nossa história?
            </h3>
            <p className="mb-6 text-gray-300">
              Seja o próximo a ter seu momento especial registrado aqui!
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/galeria"
                className="rounded-lg bg-linear-to-r from-[#B8860B] to-[#FFD700] px-8 py-3 text-base font-bold text-gray-900 transition-all hover:from-[#DAA520] hover:to-[#FFD700]"
              >
                Ver Carros
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/5527997597886"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-[#DAA520] bg-linear-to-r from-[#1A1206] to-[#2D210F] px-8 py-3 text-base font-bold text-[#FFD700] transition-all hover:bg-[#DAA520]/10"
              >
                Falar Agora
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}