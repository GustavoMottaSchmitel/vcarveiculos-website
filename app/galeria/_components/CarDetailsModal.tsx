'use client'

import { X, Fuel, Cog, Car, Shield, Calendar, Clock, Award, CheckCircle, Phone, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import React, { useState, useRef } from 'react'
import PriceTag from './PriceTag'

interface CarDetails {
    portas: number
    airbags: number
    cor: string
    motor: string
    finalPlaca: string
}

interface Car {
    id: number
    name: string
    brand: string
    model: string
    year: number
    price: number
    km: number
    tipo: string
    fuel: string
    transmission: string
    condition: 'Novo' | 'Semi-novo' | 'Usado'
    estoque: string
    mainImage: string
    images: string[]
    description: string
    tags: string[]
    details: CarDetails
}

interface CarDetailsModalProps {
    car: Car | null
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
    const videoRef = useRef<HTMLVideoElement>(null)
    
    if (!car) return null

    const allMedia = car.images || []

    const handleThumbnailClick = (index: number) => {
        setSelectedMediaIndex(index)
        if (videoRef.current) {
            videoRef.current.pause()
        }
    }

    const mainSpecs = [
        { icon: Calendar, label: 'Ano', value: car.year },
        { icon: Car, label: 'Quilometragem', value: formatKm(car.km) },
        { icon: Fuel, label: 'Combustível', value: car.fuel },
        { icon: Cog, label: 'Transmissão', value: car.transmission },
        { icon: Clock, label: 'Motor', value: car.details.motor },
        { icon: Car, label: 'Final da Placa', value: car.details.finalPlaca },
    ]

    const safetySpecs = [
        { label: 'Airbags', value: car.details.airbags },
        { label: 'Portas', value: car.details.portas },
        { label: 'Cor', value: car.details.cor },
    ]

    const benefits = [
        { icon: Shield, text: 'Documentação 100% regularizada' },
        { icon: Award, text: 'Veículo revisado e testado' },
        { icon: CheckCircle, text: 'Pronto para entrega imediata' },
    ]

    const whatsappMessage = `Olá! Tenho interesse no ${car.brand} ${car.model} ${car.year} (ID: ${car.id}) - ${car.name}`

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
                        onClick={onClose}
                    />
                    
                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header fixo */}
                            <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-8 py-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">
                                                {car.brand} {car.model}
                                            </h2>
                                            <p className="text-gray-600">{car.name}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                                                car.condition === 'Novo' 
                                                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                                    : car.condition === 'Semi-novo'
                                                    ? 'bg-amber-100 text-amber-700 border border-amber-200'
                                                    : 'bg-blue-100 text-blue-700 border border-blue-200'
                                            }`}>
                                                {car.condition}
                                            </span>
                                            <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 text-sm font-semibold border border-amber-200">
                                                {car.tipo}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <button
                                        onClick={onClose}
                                        className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
                                    >
                                        <X className="w-6 h-6 text-gray-500 group-hover:text-gray-700 transition-colors" />
                                    </button>
                                </div>
                            </div>

                            {/* Content com scroll */}
                            <div className="overflow-y-auto h-[calc(95vh-80px)]">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                                    {/* Left Column - Mídia */}
                                    <div className="space-y-6">
                                        {/* Media Principal */}
                                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200">
                                            {isVideoFile(allMedia[selectedMediaIndex]) ? (
                                                <video
                                                    ref={videoRef}
                                                    src={allMedia[selectedMediaIndex]}
                                                    className="w-full h-full object-contain"
                                                    controls
                                                    autoPlay
                                                    playsInline
                                                />
                                            ) : (
                                                <Image
                                                    src={allMedia[selectedMediaIndex] || car.mainImage}
                                                    alt={`${car.name} - Imagem ${selectedMediaIndex + 1}`}
                                                    fill
                                                    className="object-contain p-6"
                                                    priority
                                                    sizes="(max-width: 1200px) 100vw, 50vw"
                                                />
                                            )}
                                            
                                            {/* Navigation Dots */}
                                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                                {allMedia.map((_, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setSelectedMediaIndex(idx)}
                                                        className={`w-2 h-2 rounded-full transition-all ${
                                                            selectedMediaIndex === idx 
                                                                ? 'bg-amber-600 w-6'
                                                                : 'bg-gray-300 hover:bg-gray-400'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Thumbnail Gallery */}
                                        <div className="grid grid-cols-4 gap-4">
                                            {allMedia.map((media, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleThumbnailClick(idx)}
                                                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all group ${
                                                        selectedMediaIndex === idx
                                                            ? 'border-amber-600 ring-2 ring-amber-600/20'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                                >
                                                    {isVideoFile(media) ? (
                                                        <div className="relative w-full h-full bg-gray-900">
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <div className="w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                                                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                                        <path d="M8 5v14l11-7z" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <Image
                                                            src={media}
                                                            alt={`Thumbnail ${idx + 1}`}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                            sizes="25vw"
                                                        />
                                                    )}
                                                    {isVideoFile(media) && (
                                                        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                                                            VÍDEO
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Benefits Card */}
                                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
                                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                                                <Shield className="w-6 h-6 text-emerald-600" />
                                                Benefícios Inclusos
                                            </h3>
                                            <div className="space-y-3">
                                                {benefits.map((benefit, idx) => (
                                                    <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100">
                                                        <benefit.icon className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                                                        <span className="text-sm font-medium text-gray-700">{benefit.text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column - Detalhes */}
                                    <div className="space-y-8">
                                        {/* Price Card */}
                                        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border-2 border-amber-600/30 shadow-2xl">
                                            <div className="text-white mb-6">
                                                <p className="text-sm opacity-80 mb-2">Valor do Veículo</p>
                                                <div className="mt-2">
                                                    <PriceTag price={car.price} size="large" />
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 text-white/80">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                </svg>
                                                <span className="text-sm font-medium">Estoque: {car.estoque}</span>
                                            </div>
                                        </div>

                                        {/* Specifications Grid */}
                                        <div className="space-y-6">
                                            <h3 className="text-2xl font-bold text-gray-900 border-b pb-3">
                                                Especificações Técnicas
                                            </h3>
                                            
                                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                                {mainSpecs.map((spec, idx) => (
                                                    <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-amber-300 transition-colors">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <div className="p-2 rounded-lg bg-white border border-gray-200">
                                                                <spec.icon className="w-5 h-5 text-amber-600" />
                                                            </div>
                                                            <span className="text-sm font-medium text-gray-500">{spec.label}</span>
                                                        </div>
                                                        <p className="font-bold text-gray-900 text-lg">{spec.value}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Safety & Details Card */}
                                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
                                                <h4 className="font-bold text-gray-900 mb-4 text-lg">Detalhes do Veículo</h4>
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                    {safetySpecs.map((spec, idx) => (
                                                        <div key={idx} className="text-center p-4 bg-white rounded-xl border border-gray-100">
                                                            <p className="text-sm text-gray-500 mb-1">{spec.label}</p>
                                                            <p className="font-bold text-gray-900 text-xl">{spec.value}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200">
                                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                                    Sobre este veículo
                                                </h3>
                                                <p className="text-gray-700 leading-relaxed text-lg">
                                                    {car.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="sticky bottom-0 bg-white pt-6 space-y-4 pb-6 border-t border-gray-200">
                                            <motion.a
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                href={`https://wa.me/5527997597886?text=${encodeURIComponent(whatsappMessage)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-3 text-lg group"
                                            >
                                                <MessageCircle className="w-6 h-6" />
                                                Falar com Consultor no WhatsApp
                                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </motion.a>

                                            <motion.a
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                href="tel:+5527997597886"
                                                className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-3 text-lg"
                                            >
                                                <Phone className="w-5 h-5" />
                                                Ligar Agora
                                            </motion.a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}

export default CarDetailsModal