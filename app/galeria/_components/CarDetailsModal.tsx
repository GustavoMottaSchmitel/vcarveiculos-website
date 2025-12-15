'use client'

import { X, Fuel, Cog, Car, Shield, Calendar, Clock, Award, CheckCircle, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import React, { useState } from 'react'
import PriceTag from './PriceTag'
import { Car as CarType } from '../../types/index'

interface CarDetailsModalProps {
    car: CarType | null
    isOpen: boolean
    onClose: () => void
}

const formatKm = (km: number): string => {
    return km === 0 
        ? '0 KM' 
        : `${new Intl.NumberFormat('pt-BR').format(km)} km`
}

const isVideoFile = (filename: string): boolean => {
    return /\.(mp4|webm|ogg)$/i.test(filename)
}

const CarDetailsModal: React.FC<CarDetailsModalProps> = ({ car, isOpen, onClose }) => {
    const [selectedMediaIndex, setSelectedMediaIndex] = useState(0)
    
    if (!car) return null

    const allMedia = car.images || []

    const handleThumbnailClick = (index: number) => {
        setSelectedMediaIndex(index)
    }

    const mainSpecs = [
        { icon: Calendar, label: 'Ano', value: car.year },
        { icon: Car, label: 'KM Rodados', value: formatKm(car.km) },
        { icon: Fuel, label: 'Combustível', value: car.fuel },
        { icon: Cog, label: 'Câmbio', value: car.transmission },
        { icon: Clock, label: 'Motor', value: car.details.motor },
        { icon: Car, label: 'Final da Placa', value: car.details.finalPlaca },
    ]

    const details = [
        { label: 'Airbags', value: car.details.airbags },
        { label: 'Portas', value: car.details.portas },
        { label: 'Cor', value: car.details.cor },
    ]

    const benefits = [
        { icon: Shield, text: 'Documentação regularizada' },
        { icon: Award, text: 'Veículo revisado e testado' },
        { icon: CheckCircle, text: 'Pronto para entrega' },
    ]

    const whatsappMessage = `Olá! Tenho interesse no ${car.brand} ${car.model} ${car.year} (${car.name})`

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    
                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: "spring", damping: 20 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden relative flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="sticky top-0 z-30 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="min-w-0">
                                        <h2 className="text-xl font-bold text-gray-900 truncate">
                                            {car.brand} {car.model} {car.year}
                                        </h2>
                                        <p className="text-gray-600 text-sm truncate">{car.name}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                                            car.condition === 'Novo' 
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : 'bg-amber-100 text-amber-700'
                                        }`}>
                                            {car.condition}
                                        </span>
                                        <span className="px-2 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold">
                                            {car.tipo}
                                        </span>
                                    </div>
                                </div>
                                
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto">
                                <div className="p-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {/* Left Column - Mídia */}
                                        <div className="space-y-4">
                                            {/* Media Principal */}
                                            <div className="relative bg-gray-50 rounded-xl overflow-hidden aspect-4/3 border border-gray-200">
                                                {isVideoFile(allMedia[selectedMediaIndex]) ? (
                                                    <div className="relative w-full h-full">
                                                        <video
                                                            src={allMedia[selectedMediaIndex]}
                                                            className="w-full h-full object-contain"
                                                            controls
                                                            playsInline
                                                        />
                                                    </div>
                                                ) : (
                                                    <Image
                                                        src={allMedia[selectedMediaIndex] || car.mainImage}
                                                        alt={`${car.name}`}
                                                        fill
                                                        className="object-contain p-4"
                                                        sizes="(max-width: 768px) 100vw, 50vw"
                                                    />
                                                )}
                                            </div>

                                            {/* Thumbnail Gallery */}
                                            <div className="grid grid-cols-5 gap-2">
                                                {allMedia.map((media, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleThumbnailClick(idx)}
                                                        className={`relative aspect-square rounded-lg overflow-hidden border transition-all ${
                                                            selectedMediaIndex === idx
                                                                ? 'border-amber-500 ring-1 ring-amber-500'
                                                                : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                    >
                                                        {isVideoFile(media) ? (
                                                            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                                                                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                                        <path d="M8 5v14l11-7z" />
                                                                    </svg>
                                                                </div>
                                                                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded">
                                                                    VÍDEO
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <Image
                                                                src={media}
                                                                alt={`Thumbnail ${idx + 1}`}
                                                                fill
                                                                className="object-cover"
                                                                sizes="20vw"
                                                            />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Benefits */}
                                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                    <Shield className="w-4 h-4 text-emerald-600" />
                                                    Benefícios Inclusos
                                                </h3>
                                                <div className="space-y-2">
                                                    {benefits.map((benefit, idx) => (
                                                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                                            <benefit.icon className="w-4 h-4 text-emerald-600 shrink-0" />
                                                            <span>{benefit.text}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Column - Detalhes */}
                                        <div className="space-y-6">
                                            {/* Price Card */}
                                            <div className="bg-linear-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800">
                                                <div className="text-white mb-4">
                                                    <p className="text-sm text-gray-400 mb-2">Valor do Veículo</p>
                                                    <div className="mt-1">
                                                        <PriceTag price={car.price} size="medium" />
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                    </svg>
                                                    <span>Disponível em estoque</span>
                                                </div>
                                            </div>

                                            {/* Specifications */}
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-4">
                                                    Especificações Técnicas
                                                </h3>
                                                
                                                <div className="grid grid-cols-2 gap-3">
                                                    {mainSpecs.map((spec, idx) => (
                                                        <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <spec.icon className="w-4 h-4 text-amber-600" />
                                                                <span className="text-sm text-gray-600">{spec.label}</span>
                                                            </div>
                                                            <p className="font-semibold text-gray-900 text-base">{spec.value}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Details */}
                                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                                <h4 className="font-semibold text-gray-900 mb-3">Detalhes do Veículo</h4>
                                                <div className="grid grid-cols-3 gap-3">
                                                    {details.map((spec, idx) => (
                                                        <div key={idx} className="text-center p-3 bg-white rounded-lg border border-gray-100">
                                                            <p className="text-xs text-gray-500 mb-1">{spec.label}</p>
                                                            <p className="font-bold text-gray-900 text-lg">{spec.value}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                                <h3 className="font-semibold text-gray-900 mb-3">
                                                    Sobre este veículo
                                                </h3>
                                                <p className="text-gray-700 leading-relaxed text-sm">
                                                    {car.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button - Fixed at Bottom */}
                            <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
                                <motion.a
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    href={`https://wa.me/5527997597886?text=${encodeURIComponent(whatsappMessage)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-2 text-base"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Falar com Consultor no WhatsApp
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}

export default CarDetailsModal