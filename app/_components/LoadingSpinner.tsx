'use client'

import { motion } from 'framer-motion'
import { Car } from 'lucide-react'

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          }}
          className="inline-block mb-8"
        >
          <div className="w-24 h-24 rounded-full bg-linear-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-xl">
            <Car className="w-12 h-12 text-white" />
          </div>
        </motion.div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Carregando Galeria
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Preparando nossa seleção premium de veículos para você...
          </p>
          
          {/* Loading dots */}
          <div className="flex justify-center space-x-2 pt-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-amber-500 rounded-full"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}