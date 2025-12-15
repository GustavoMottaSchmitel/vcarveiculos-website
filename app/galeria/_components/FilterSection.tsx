'use client'

import React, { useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Filter } from 'lucide-react'

interface FilterSectionProps {
  title: string
  children: ReactNode
  isDefaultExpanded?: boolean
}

const FilterSection: React.FC<FilterSectionProps> = ({ 
  title, 
  children, 
  isDefaultExpanded = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(isDefaultExpanded)

  return (
    <motion.div 
      initial={false}
      className="bg-white rounded-xl border border-gray-200 hover:border-amber-300 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left focus:outline-none focus:ring-2 focus:ring-amber-500/20 rounded-xl"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-linear-to-br from-amber-50 to-amber-100 border border-amber-200">
            <Filter className="w-4 h-4 text-amber-600" />
          </div>
          <h3 className="text-base font-bold text-gray-900">
            {title}
          </h3>
        </div>
        
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="p-2 rounded-lg bg-gray-50 hover:bg-amber-50 transition-colors"
        >
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0 border-t border-gray-100">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default FilterSection