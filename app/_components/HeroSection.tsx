"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const particleAnimations = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  y: [0, 30 + i * 7, 0],
  x: [0, (i % 3) * 5 - 5, 0],
  opacity: [0, 0.3 + (i % 5) * 0.05, 0],
  scale: [0, 1, 0],
  duration: 2.5 + (i % 4) * 0.5,
  delay: i * 0.3,
  left: `${10 + i * 7}%`,
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
  left: `${20 + i * 10}%`,
  bottom: "10%",
}))

const features = [
  {
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Procedência 100%",
    desc: "Veículos com histórico verificado",
  },
  {
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Atendimento especial",
    desc: "Qualidade no atendimento",
  },
]

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleImageLoad = () => {
    setIsLoaded(true)
  }

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-linear-to-br from-gray-950 via-black to-gray-900"
      aria-label="V Car Veículos - Excelência Automotiva"
    >
      <div className="absolute inset-0 bg-linear-to-br from-gray-900/30 via-black/40 to-gray-800/20" />

      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={isLoaded ? { scale: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="relative h-full w-full">
          <Image
            src="/herosection/car.jpg"
            alt="Interior de veículo premium mostrando acabamento detalhado"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-center"
            onLoad={handleImageLoad}
          />
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
        </div>
      </motion.div>

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-linear-to-r from-gray-200/5 to-gray-400/10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-linear-to-l from-gray-300/5 to-gray-500/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />
      </div>

      <motion.div
        className="absolute inset-0 opacity-[0.08]"
        animate={{
          backgroundPosition: ["0px 0px", "50px 50px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage: `linear-gradient(90deg, transparent 95%, rgba(255,255,255,0.1) 100%),
                            linear-gradient(0deg, transparent 95%, rgba(255,255,255,0.1) 100%)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center lg:grid lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left"
          >
            <div className="flex flex-col items-center lg:items-start">
              <motion.div
                className="mb-6 inline-flex items-center gap-3"
                initial={{ opacity: 0, y: -20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  className="h-1 w-10 bg-linear-to-r from-amber-500 to-yellow-400"
                  initial={{ width: 0 }}
                  animate={isLoaded ? { width: "2.5rem" } : {}}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.span
                  className="text-xs font-light tracking-widest text-amber-500 uppercase sm:text-sm"
                  initial={{ opacity: 0 }}
                  animate={isLoaded ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  Excelência Automotiva
                </motion.span>
              </motion.div>

              <div className="mb-8 lg:mb-12">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  <div className="flex flex-col justify-center lg:flex-row lg:items-center lg:gap-1 lg:justify-start">
                    <motion.span
                      className="whitespace-nowrap text-amber-400"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      V Car
                    </motion.span>
                    <motion.span
                      className="hidden text-amber-500 lg:block"
                      initial={{ scale: 0 }}
                      animate={isLoaded ? { scale: 1 } : {}}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 10,
                        delay: 0.6,
                      }}
                    />
                    <motion.span
                      className="whitespace-nowrap text-white"
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
                className="mb-8 max-w-lg text-base font-light leading-relaxed text-gray-300 sm:text-lg md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <span className="font-medium text-white">
                  Onde a excelência encontra o asfalto
                </span>
                .
                <span className="mt-1 block sm:mt-3">
                  Carros com procedência verificada e qualidade incomparável.
                </span>
              </motion.p>
            </div>

            <div className="mx-auto grid max-w-md grid-cols-1 gap-4 pt-4 sm:grid-cols-2 sm:gap-6 lg:mx-0 lg:max-w-none">
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.5 + index * 0.2 }}
                >
                  <div className="flex items-center justify-center gap-3 lg:justify-start">
                    <motion.div
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-r from-amber-500/20 to-yellow-400/10 sm:h-8 sm:w-8"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <svg
                        className="h-3 w-3 text-amber-400 sm:h-4 sm:w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={item.icon}
                        />
                      </svg>
                    </motion.div>
                    <span className="text-sm font-medium text-white sm:text-base">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-center text-xs text-gray-400 sm:text-sm lg:text-left">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 2.1 }}
              className="flex flex-col justify-center gap-3 pt-6 sm:flex-row sm:gap-4 lg:justify-start"
            >
              <motion.button
                className="group relative cursor-pointer overflow-hidden rounded-lg bg-linear-to-r from-amber-600 to-yellow-500 px-5 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:from-amber-500 hover:to-yellow-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] sm:px-6 sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >

                <a href="#assistente">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <motion.svg
                      className="h-4 w-4 sm:h-5 sm:w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </motion.svg>
                    <span>Encontrar Meu Carro</span>
                  </span>
                </a>
                <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-amber-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={isLoaded ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: "backOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative ml-auto w-full max-w-sm">
              <div className="relative aspect-square">
                <motion.div
                  className="absolute inset-0 rounded-full border border-amber-500/20"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: {
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    },
                  }}
                />
                <motion.div
                  className="absolute inset-8 rounded-full border border-amber-500/10"
                  animate={{
                    rotate: -360,
                    scale: [1, 1.03, 1],
                  }}
                  transition={{
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                    scale: {
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 0.5,
                    },
                  }}
                />
                <motion.div
                  className="absolute inset-16 rounded-full border border-amber-500/5"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.04, 1],
                  }}
                  transition={{
                    rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                    scale: {
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 1,
                    },
                  }}
                />

                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    scale: {
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    },
                    rotate: { duration: 8, repeat: Infinity },
                  }}
                >
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border border-amber-500/20 bg-linear-to-br from-amber-500/10 to-yellow-400/5">
                    <motion.svg
                      className="h-12 w-12 text-amber-400/70"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{
                        strokeWidth: [1, 1.5, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </motion.svg>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:bottom-[-60px]"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-2">
            <motion.span
              className="text-xs font-medium tracking-widest text-amber-500/60 uppercase"
              animate={{
                opacity: [0.6, 1, 0.6],
                y: [0, -3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              Role para explorar
            </motion.span>
            <motion.div
              className="h-8 w-px bg-linear-to-b from-amber-500/50 via-amber-500/30 to-transparent lg:h-12"
              animate={{
                height: ["32px", "40px", "32px"],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute top-6 left-6 h-40 w-40 border-t border-l border-amber-500/10"
        animate={{
          borderWidth: ["1px", "2px", "1px"],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-6 right-6 h-40 w-40 border-b border-r border-amber-500/10"
        animate={{
          borderWidth: ["1px", "2px", "1px"],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />

      <div className="absolute inset-0 pointer-events-none">
        {particleAnimations.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute h-0.5 w-0.5 rounded-full bg-amber-400/40"
            animate={{
              y: particle.y,
              x: particle.x,
              opacity: particle.opacity,
              scale: particle.scale,
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
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
            className="absolute h-1 w-1 rounded-full bg-yellow-300"
            animate={{
              y: spark.y,
              x: spark.x,
              opacity: spark.opacity,
              scale: spark.scale,
            }}
            transition={{
              duration: spark.duration,
              repeat: Infinity,
              delay: spark.delay,
              ease: "easeOut",
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