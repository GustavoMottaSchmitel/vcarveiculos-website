'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Car, Fuel, Cog, Calendar, ShieldCheck } from 'lucide-react'
import PriceTag from './PriceTag'
import { CarCardProps } from '../../types/index'

interface CarCardComponentProps {
    car: CarCardProps
    onViewDetails: (car: CarCardProps) => void
}

const formatKm = (km: number): string => {
    return km === 0 
        ? '0 KM' 
        : `${new Intl.NumberFormat('pt-BR').format(km)} km`
}

const CarCard: React.FC<CarCardComponentProps> = ({ car, onViewDetails }) => {
    const conditionColors = {
        'Novo': { bg: 'bg-emerald-500', text: 'text-emerald-700' },
        'Semi-novo': { bg: 'bg-amber-500', text: 'text-amber-700' },
        'Usado': { bg: 'bg-blue-500', text: 'text-blue-700' }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 flex flex-col cursor-pointer"
            onClick={() => onViewDetails(car)}
        >
            {/* Badge de Condição */}
            <div className={`absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-xs font-bold text-white ${conditionColors[car.condition].bg} backdrop-blur-sm`}>
                {car.condition}
            </div>

            {/* Badge de Tipo */}
            <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-linear-to-r from-amber-600 to-amber-500 text-white text-xs font-bold shadow-lg">
                {car.tipo}
            </div>

            {/* Container da Imagem */}
            <div className="relative h-64 bg-linear-to-br from-gray-100 to-gray-200 overflow-hidden">
                <Image
                    src={car.mainImage}
                    alt={`${car.brand} ${car.model} ${car.year}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    priority={false}
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Conteúdo do Card */}
            <div className="p-6 flex flex-col grow">
                {/* Header */}
                <div className="mb-4">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 leading-tight">
                                {car.brand} {car.model}
                            </h3>
                            <p className="text-gray-600 mt-1 line-clamp-2">{car.name}</p>
                        </div>
                        <div className="flex items-center gap-2 pl-4">
                            <Calendar className="w-5 h-5 text-amber-600" />
                            <span className="text-lg font-bold text-gray-900">{car.year}</span>
                        </div>
                    </div>
                </div>

                {/* Preço */}
                <div className="my-6">
                    <PriceTag price={car.price} size="medium" />
                </div>

                {/* Especificações */}
                <div className="mt-auto pt-6 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4">
                        {/* KM */}
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-linear-to-br from-gray-50 to-white border border-gray-200 shadow-sm">
                                <Car className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Quilometragem</p>
                                <p className="text-sm font-bold text-gray-900">{formatKm(car.km)}</p>
                            </div>
                        </div>

                        {/* Combustível */}
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-linear-to-br from-gray-50 to-white border border-gray-200 shadow-sm">
                                <Fuel className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Combustível</p>
                                <p className="text-sm font-bold text-gray-900">{car.fuel}</p>
                            </div>
                        </div>

                        {/* Câmbio */}
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-linear-to-br from-gray-50 to-white border border-gray-200 shadow-sm">
                                <Cog className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Transmissão</p>
                                <p className="text-sm font-bold text-gray-900">{car.transmission}</p>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-linear-to-br from-gray-50 to-white border border-gray-200 shadow-sm">
                                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</p>
                                <p className="text-sm font-bold text-gray-900">Disponível</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Botão */}
            <div className="px-6 pb-6">
                <motion.button
                    onClick={(e) => { e.stopPropagation(); onViewDetails(car); }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-linear-to-r from-amber-600 to-amber-500 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 group/btn relative overflow-hidden"
                >
                    <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                        Ver Detalhes
                        <svg 
                            className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-amber-700 to-amber-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </motion.button>
            </div>
        </motion.div>
    )
}

export default CarCard