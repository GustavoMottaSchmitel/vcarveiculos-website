'use client'

import { motion } from 'framer-motion'
import { Tag } from 'lucide-react'
import React, { useMemo } from 'react'

type Size = 'small' | 'medium' | 'large'

interface PriceTagProps {
    price: number
    size?: Size
}

const formatPrice = (p: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(p)
}

const PriceTag: React.FC<PriceTagProps> = ({ price, size = 'medium' }) => {
    const { sizeClasses, formattedPrice } = useMemo(() => {
        const classes = {
            small: {
                container: 'px-4 py-3 rounded-xl',
                price: 'text-lg font-bold',
                icon: 'w-4 h-4',
            },
            medium: {
                container: 'px-6 py-4 rounded-xl',
                price: 'text-xl sm:text-2xl font-bold',
                icon: 'w-5 h-5',
            },
            large: {
                container: 'px-8 py-6 rounded-2xl',
                price: 'text-3xl sm:text-4xl font-extrabold',
                icon: 'w-6 h-6',
            },
        }
        
        const sizeClasses = classes[size]
        const formattedPrice = formatPrice(price)

        return { sizeClasses, formattedPrice }
    }, [price, size])

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`relative bg-linear-to-br from-white to-gray-50 ${sizeClasses.container} border-2 border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 group`}
        >
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-linear-to-br from-amber-50 to-amber-100 border border-amber-200 shadow-sm`}>
                    <Tag className={`${sizeClasses.icon} text-amber-600`} />
                </div>
                <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-2 font-medium">Valor Total</p>
                    <div className="flex items-baseline gap-2">
                        <span className={`${sizeClasses.price} text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-amber-500`}>
                            {formattedPrice}
                        </span>
                    </div>
                </div>
            </div>
            
            {/* Decorative Elements */}
            
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
    )
}

export default PriceTag