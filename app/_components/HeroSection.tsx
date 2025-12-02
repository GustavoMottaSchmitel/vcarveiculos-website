"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleImageLoad = () => {
    setIsLoaded(true)
  }

  const particleAnimations = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    y: [0, 30 + i * 7, 0],
    x: [0, (i % 3) * 5 - 5, 0],
    opacity: [0, 0.3 + (i % 5) * 0.05, 0],
    scale: [0, 1, 0],
    duration: 2.5 + (i % 4) * 0.5,
    delay: i * 0.3,
    left: `${10 + (i * 7)}%`,
    top: `${30 + (i % 3) * 5}%`,
  }))

  const sparkAnimations = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    y: [0, -80 - i * 10],
    x: [0, (i % 4) * 8 - 12],
    opacity: [0, 1, 0],
    scale: [0, 1.5, 0],
    duration: 1.5,
    delay: i * 0.5,
    left: `${20 + (i * 10)}%`,
    bottom: '10%',
  }))

  return (
    <section 
      id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-gray-950 via-black to-gray-900"
      aria-label="V Car Veículos - Excelência Automotiva"
    >
      {/* Background com gradiente sutil */}
      <div className="absolute inset-0 bg-linear-to-br from-gray-900/30 via-black/40 to-gray-800/20" />
      
      {/* Imagem do Carro */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={isLoaded ? { scale: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1710011115876-301113e1bb61?q=80&w=870&auto=format&fit=crop"
            alt="Dentro do carro"
            fill
            priority
            sizes="100vw"
            quality={100}
            className="object-cover object-center"
            onLoad={handleImageLoad}
            onLoadingComplete={handleImageLoad}
          />
          {/* Overlay gradiente premium com animação */}
          <motion.div 
            className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
        </div>
      </motion.div>

      {/* Efeito de brilho metálico animado */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-linear-to-r from-gray-200/5 to-gray-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bbg-linear-to-l from-gray-300/5 to-gray-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
      </div>

      {/* Linhas de grade metálicas animadas */}
      <motion.div 
        className="absolute inset-0 opacity-[0.08]"
        animate={{
          backgroundPosition: ["0px 0px", "50px 50px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: `linear-gradient(90deg, transparent 95%, rgba(255,255,255,0.1) 100%),
                           linear-gradient(0deg, transparent 95%, rgba(255,255,255,0.1) 100%)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Conteúdo Principal - Centralizado em todas as telas */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-8 items-center justify-center">
          
          {/* Texto e Conteúdo - Centralizado no mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left w-full max-w-2xl mx-auto lg:mx-0"
          >
            {/* Logo/Texto da Marca com animação */}
            <div className="flex flex-col items-center lg:items-start">
              <motion.div 
                className="inline-flex items-center gap-3 mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div 
                  className="w-10 h-1 bg-linear-to-r from-amber-500 to-yellow-400"
                  initial={{ width: 0 }}
                  animate={isLoaded ? { width: "2.5rem" } : {}}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.span 
                  className="text-amber-500 font-light tracking-widest text-xs sm:text-sm uppercase"
                  initial={{ opacity: 0 }}
                  animate={isLoaded ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  Excelência Automotiva
                </motion.span>
              </motion.div>
              
              <div className="mb-8 lg:mb-12">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:gap-1 justify-center lg:justify-start">
                    <motion.span 
                      className="text-amber-400 whitespace-nowrap"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      V Car
                    </motion.span>
                    <motion.span 
                      className="text-amber-500 lg:block hidden"
                      initial={{ scale: 0 }}
                      animate={isLoaded ? { scale: 1 } : {}}
                      transition={{ 
                        type: "spring", 
                        stiffness: 200, 
                        damping: 10,
                        delay: 0.6
                      }}
                    >
                    </motion.span>
                    <motion.span 
                      className="text-white whitespace-nowrap"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.9 }}
                    >
                      Veículos
                    </motion.span>
                  </div>
                </h1>
              </div>

              <motion.p 
                className="text-base sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <span className="text-white font-medium">Onde a excelência encontra o asfalto</span>. 
                <span className="block mt-1 sm:mt-3">Carros com procedência verificada e qualidade incomparável.</span>
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4 max-w-md mx-auto lg:mx-0 lg:max-w-none">
              {[
                {
                  icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                  title: "Procedência 100%",
                  desc: "Veículos com histórico verificado"
                },
                {
                  icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                  title: "Atendimento especial",
                  desc: "Qualidade no atendimento"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.5 + (index * 0.2) }}
                >
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <motion.div 
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-linear-to-r from-amber-500/20 to-yellow-400/10 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </motion.div>
                    <span className="text-white font-medium text-sm sm:text-base">{item.title}</span>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm text-center lg:text-left">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Botões Premium com animação */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 2.1 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 justify-center lg:justify-start"
            >
              <motion.button 
                className="group relative px-5 sm:px-6 py-3 cursor-pointer rounded-lg bg-linear-to-r from-amber-600 to-yellow-500 text-white font-semibold text-sm sm:text-base tracking-wide hover:from-amber-500 hover:to-yellow-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <motion.svg 
                    className="w-4 h-4 sm:w-5 sm:h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </motion.svg>
                  <span>Encontrar Meu Carro</span>
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              <motion.button 
                className="group relative px-5 sm:px-6 py-3 rounded-lg border border-amber-500/30 bg-linear-to-r from-transparent to-amber-500/5 text-amber-300 font-semibold text-sm sm:text-base tracking-wide hover:border-amber-400 hover:bg-amber-500/10 hover:text-amber-200 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Ver Catálogo</span>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Lado Direito - Anel metálico animado (visível apenas em desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={isLoaded ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: "backOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full max-w-sm ml-auto">
              <div className="relative aspect-square">
                {/* Anéis concêntricos animados */}
                <motion.div 
                  className="absolute inset-0 rounded-full border border-amber-500/20"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, repeatType: "reverse" }
                  }}
                />
                <motion.div 
                  className="absolute inset-8 rounded-full border border-amber-500/10"
                  animate={{ 
                    rotate: -360,
                    scale: [1, 1.03, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, repeatType: "reverse", delay: 0.5 }
                  }}
                />
                <motion.div 
                  className="absolute inset-16 rounded-full border border-amber-500/5"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.04, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                    scale: { duration: 5, repeat: Infinity, repeatType: "reverse", delay: 1 }
                  }}
                />
                
                {/* Ícone de carro central animado */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{ 
                    scale: { duration: 3, repeat: Infinity, repeatType: "reverse" },
                    rotate: { duration: 8, repeat: Infinity }
                  }}
                >
                  <div className="w-24 h-24 rounded-full bg-linear-to-br from-amber-500/10 to-yellow-400/5 border border-amber-500/20 flex items-center justify-center">
                    <motion.svg 
                      className="w-12 h-12 text-amber-400/70" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ 
                        strokeWidth: [1, 1.5, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </motion.svg>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Indicador de scroll - MAIS PARA BAIXO */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-4 lg:bottom-[-60px] left-1/2 -translate-x-1/2"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-2">
            <motion.span 
              className="text-amber-500/60 text-xs font-medium tracking-widest uppercase"
              animate={{ 
                opacity: [0.6, 1, 0.6],
                y: [0, -3, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Role para explorar
            </motion.span>
            <motion.div 
              className="w-px h-8 lg:h-12 bg-linear-to-b from-amber-500/50 via-amber-500/30 to-transparent"
              animate={{ 
                height: ["32px", "40px", "32px"],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Decoração de canto animada */}
      <motion.div 
        className="absolute top-6 left-6 w-40 h-40 border-t border-l border-amber-500/10"
        animate={{ 
          borderWidth: ["1px", "2px", "1px"],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute bottom-6 right-6 w-40 h-40 border-b border-r border-amber-500/10"
        animate={{ 
          borderWidth: ["1px", "2px", "1px"],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />
      
      {/* Partículas de brilho animadas com valores fixos */}
      <div className="absolute inset-0 pointer-events-none">
        {particleAnimations.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-0.5 h-0.5 bg-amber-400/40 rounded-full"
            animate={{
              y: particle.y,
              x: particle.x,
              opacity: particle.opacity,
              scale: particle.scale
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
            style={{
              left: particle.left,
              top: particle.top,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {sparkAnimations.map((spark) => (
          <motion.div
            key={`spark-${spark.id}`}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full"
            animate={{
              y: spark.y,
              x: spark.x,
              opacity: spark.opacity,
              scale: spark.scale
            }}
            transition={{
              duration: spark.duration,
              repeat: Infinity,
              delay: spark.delay,
              ease: "easeOut"
            }}
            style={{
              left: spark.left,
              bottom: spark.bottom,
            }}
          />
        ))}
      </div>
    </section>
  )
}