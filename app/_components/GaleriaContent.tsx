'use client'

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X, Car, Sparkles, ChevronRight, Sliders, RefreshCw, Star, TrendingUp, Flame, Cog } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'

import { 
    CAR_DATA, 
    TIPO_OPTIONS, 
    MARCA_OPTIONS, 
    FUEL_TYPES, 
    TRANSMISSION_TYPES 
} from '../galeria/data/carData'
import CarCard from '../galeria/_components/CarCard'
import CarDetailsModal from '../galeria/_components/CarDetailsModal'
import { Car as CarType, CarCardProps, FilterState, ChatbotFilters, CarCondition } from '../types'

// Calcular limites de preço dinamicamente
const MAX_PRICE_LIMIT = Math.max(...CAR_DATA.map(car => car.price))
const MIN_PRICE_LIMIT = Math.min(...CAR_DATA.map(car => car.price))

// Interface estendida para incluir sortBy
interface ExtendedFilterState extends FilterState {
    sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'year-desc' | 'km-asc';
}

// Componente de Range Slider customizado
interface RangeSliderProps {
    min: number
    max: number
    minValue: number
    maxValue: number
    onChange: (min: number, max: number) => void
    formatLabel: (value: number) => string
}

const RangeSlider: React.FC<RangeSliderProps> = ({ 
    min, 
    max, 
    minValue, 
    maxValue, 
    onChange, 
    formatLabel 
}) => {
    const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null)
    const isDraggingRef = useRef<'min' | 'max' | null>(null)
    const mouseMoveHandlerRef = useRef<(e: MouseEvent) => void>(() => {})
    const mouseUpHandlerRef = useRef<() => void>(() => {})

    // Definir handlers primeiro
    const handleMouseMove = useCallback((e: MouseEvent) => {
        const draggingType = isDraggingRef.current
        if (!draggingType) return
        
        const slider = document.getElementById('price-slider')
        if (!slider) return

        const rect = slider.getBoundingClientRect()
        const x = e.clientX - rect.left
        const percentage = Math.max(0, Math.min(1, x / rect.width))
        const value = min + percentage * (max - min)

        if (draggingType === 'min') {
            const newMin = Math.min(value, maxValue - 1000)
            onChange(Math.max(min, Math.floor(newMin / 1000) * 1000), maxValue)
        } else {
            const newMax = Math.max(value, minValue + 1000)
            onChange(minValue, Math.min(max, Math.ceil(newMax / 1000) * 1000))
        }
    }, [minValue, maxValue, min, max, onChange])

    const handleMouseUp = useCallback(() => {
        isDraggingRef.current = null
        setIsDragging(null)
        document.removeEventListener('mousemove', mouseMoveHandlerRef.current)
        document.removeEventListener('mouseup', mouseUpHandlerRef.current)
    }, [])

    // Atualizar refs quando handlers mudam
    useEffect(() => {
        mouseMoveHandlerRef.current = handleMouseMove
        mouseUpHandlerRef.current = handleMouseUp
    }, [handleMouseMove, handleMouseUp])

    const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
        e.preventDefault()
        isDraggingRef.current = type
        setIsDragging(type)
        document.addEventListener('mousemove', mouseMoveHandlerRef.current)
        document.addEventListener('mouseup', mouseUpHandlerRef.current)
    }

    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', mouseMoveHandlerRef.current)
            document.removeEventListener('mouseup', mouseUpHandlerRef.current)
        }
    }, [])

    const minPercentage = ((minValue - min) / (max - min)) * 100
    const maxPercentage = ((maxValue - min) / (max - min)) * 100

    return (
        <div className="relative py-6">
            {/* Linha de fundo */}
            <div className="absolute inset-0 h-1.5 bg-gray-200 rounded-full"></div>
            
            {/* Linha de seleção */}
            <div 
                className="absolute h-1.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                style={{ left: `${minPercentage}%`, width: `${maxPercentage - minPercentage}%` }}
            ></div>

            {/* Slider container para track */}
            <div id="price-slider" className="absolute inset-0 h-8 flex items-center cursor-pointer">
                {/* Ponto mínimo */}
                <div
                    className="absolute w-6 h-6 -ml-3 rounded-full bg-white border-3 border-amber-600 shadow-lg cursor-grab active:cursor-grabbing z-20"
                    style={{ left: `${minPercentage}%` }}
                    onMouseDown={handleMouseDown('min')}
                >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
                        {formatLabel(minValue)}
                    </div>
                </div>

                {/* Ponto máximo */}
                <div
                    className="absolute w-6 h-6 -ml-3 rounded-full bg-white border-3 border-amber-600 shadow-lg cursor-grab active:cursor-grabbing z-20"
                    style={{ left: `${maxPercentage}%` }}
                    onMouseDown={handleMouseDown('max')}
                >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
                        {formatLabel(maxValue)}
                    </div>
                </div>
            </div>

            {/* Display dos valores */}
            <div className="flex justify-between text-sm text-gray-500 mt-8">
                <span>{formatLabel(min)}</span>
                <span>{formatLabel(max)}</span>
            </div>
        </div>
    )
}

// Componente de filtro checkbox com ícones
interface FilterOptionProps {
    option: string
    icon?: React.ReactNode
    count?: number
    isSelected: boolean
    onChange: () => void
    type?: string
}

const FilterOption: React.FC<FilterOptionProps> = ({ 
    option, 
    icon, 
    count, 
    isSelected, 
    onChange,
    type 
}) => {
    const getIcon = () => {
        if (icon) return icon
        switch(type) {
            case 'marca':
                return <Car className="w-4 h-4" />
            case 'tipo':
                return <Car className="w-4 h-4" />
            case 'fuel':
                return <Flame className="w-4 h-4" />
            case 'transmission':
                return <Cog className="w-4 h-4" />
            default:
                return null
        }
    }

    return (
        <motion.label 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                isSelected 
                    ? 'bg-gradient-to-r from-amber-50 to-amber-100 border-2 border-amber-300 shadow-sm' 
                    : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
            }`}
        >
            <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded flex items-center justify-center ${
                    isSelected ? 'bg-amber-600' : 'bg-gray-300'
                }`}>
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={onChange}
                        className="sr-only"
                    />
                    {isSelected && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {getIcon()}
                    <span className={`font-medium ${isSelected ? 'text-amber-700' : 'text-gray-700'}`}>
                        {option}
                    </span>
                </div>
            </div>
            {count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    isSelected ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                    {count}
                </span>
            )}
        </motion.label>
    )
}

// Componente separado que usa useSearchParams
function GaleriaContentWithParams() {
    const searchParams = useSearchParams()
    const router = useRouter()

    // Estado dos filtros com tipo correto
    const [filters, setFilters] = useState<ExtendedFilterState>({
        searchTerm: '',
        selectedTipos: [],
        selectedMarcas: [],
        selectedConditions: [],
        selectedFuels: [],
        selectedTransmissions: [],
        minPrice: MIN_PRICE_LIMIT,
        maxPrice: MAX_PRICE_LIMIT,
        sortBy: 'relevance',
    })

    const [selectedCar, setSelectedCar] = useState<CarType | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [showSortMenu, setShowSortMenu] = useState(false)

    // Processar filtros do chatbot da URL - USAR useMemo
    const chatbotFilters = useMemo(() => {
        const params = new URLSearchParams(searchParams.toString())
        const filters: Partial<ExtendedFilterState> = {}

        // Extrair filtros da URL
        const profile = params.get('profile')
        const budget = params.get('budget')
        const fuelType = params.get('fuelType')
        const transmission = params.get('transmission')
        const usage = params.get('usage')

        // Aplicar filtros do chatbot
        if (profile === 'familia') filters.selectedMarcas = ['Toyota', 'Volkswagen', 'Honda', 'Chevrolet']
        if (profile === 'trabalho') filters.selectedMarcas = ['Ford', 'Toyota', 'Chevrolet']
        if (profile === 'primeiro-carro') filters.selectedMarcas = ['Chevrolet', 'Fiat', 'Volkswagen', 'Hyundai']
        if (profile === 'cidade') filters.selectedMarcas = ['Fiat', 'Hyundai', 'Volkswagen', 'Renault']

        if (budget === 'ate-30') {
            filters.minPrice = MIN_PRICE_LIMIT
            filters.maxPrice = 30000
        }
        if (budget === '30-50') {
            filters.minPrice = 30000
            filters.maxPrice = 50000
        }
        if (budget === '50-80') {
            filters.minPrice = 50000
            filters.maxPrice = 80000
        }
        if (budget === '80-120') {
            filters.minPrice = 80000
            filters.maxPrice = 120000
        }

        if (fuelType === 'flex') filters.selectedFuels = ['Flex']
        if (fuelType === 'gasolina') filters.selectedFuels = ['Gasolina']
        if (fuelType === 'diesel') filters.selectedFuels = ['Diesel']

        if (transmission === 'automatico') filters.selectedTransmissions = ['Automática']
        if (transmission === 'manual') filters.selectedTransmissions = ['Manual']

        if (usage === 'diario') filters.selectedTipos = ['Hatchback', 'Sedan']
        if (usage === 'viagens') filters.selectedTipos = ['SUV', 'Sedan']
        if (usage === 'trabalho') filters.selectedTipos = ['Pickup']

        return filters
    }, [searchParams])

    // Aplicar filtros do chatbot apenas na montagem inicial
    const hasAppliedFiltersRef = useRef(false)

    useEffect(() => {
        // Aplicar filtros do chatbot apenas uma vez na montagem inicial
        if (!hasAppliedFiltersRef.current && Object.keys(chatbotFilters).length > 0) {
            hasAppliedFiltersRef.current = true
            
            // Usar timeout para evitar renderização síncrona
            const timer = setTimeout(() => {
                setFilters(prev => ({ ...prev, ...chatbotFilters }))
            }, 0)
            
            return () => clearTimeout(timer)
        }
    }, [chatbotFilters])

    // Contar carros por categoria
    const carCounts = useMemo(() => {
        const counts = {
            tipos: {} as Record<string, number>,
            marcas: {} as Record<string, number>,
            combustiveis: {} as Record<string, number>,
            transmissoes: {} as Record<string, number>,
            condicoes: {} as Record<string, number>,
        }

        CAR_DATA.forEach(car => {
            counts.tipos[car.tipo] = (counts.tipos[car.tipo] || 0) + 1
            counts.marcas[car.brand] = (counts.marcas[car.brand] || 0) + 1
            counts.combustiveis[car.fuel] = (counts.combustiveis[car.fuel] || 0) + 1
            counts.transmissoes[car.transmission] = (counts.transmissoes[car.transmission] || 0) + 1
            counts.condicoes[car.condition] = (counts.condicoes[car.condition] || 0) + 1
        })

        return counts
    }, [])

    // Filtrar e ordenar carros
    const filteredCars = useMemo(() => {
        const result = CAR_DATA.filter(car => {
            const { 
                searchTerm, selectedTipos, selectedMarcas, 
                selectedConditions, selectedFuels, selectedTransmissions, 
                minPrice, maxPrice 
            } = filters

            // Busca por texto
            if (searchTerm) {
                const searchLower = searchTerm.toLowerCase()
                const searchFields = [
                    car.brand.toLowerCase(),
                    car.model.toLowerCase(),
                    car.name.toLowerCase(),
                    car.tipo.toLowerCase(),
                    car.description.toLowerCase()
                ].join(' ')
                
                if (!searchFields.includes(searchLower)) return false
            }

            // Filtros por categoria
            if (selectedTipos.length > 0 && !selectedTipos.includes(car.tipo)) return false
            if (selectedMarcas.length > 0 && !selectedMarcas.includes(car.brand)) return false
            if (selectedConditions.length > 0 && !selectedConditions.includes(car.condition)) return false
            if (selectedFuels.length > 0 && !selectedFuels.includes(car.fuel)) return false
            if (selectedTransmissions.length > 0 && !selectedTransmissions.includes(car.transmission)) return false
            if (car.price < minPrice || car.price > maxPrice) return false

            return true
        })

        // Ordenação
        switch (filters.sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price)
                break
            case 'price-desc':
                result.sort((a, b) => b.price - a.price)
                break
            case 'year-desc':
                result.sort((a, b) => b.year - a.year)
                break
            case 'km-asc':
                result.sort((a, b) => a.km - b.km)
                break
            case 'relevance':
            default:
                // Ordenação padrão: destacados primeiro
                result.sort((a, b) => {
                    if (a.tags?.includes('destaque') && !b.tags?.includes('destaque')) return -1
                    if (!a.tags?.includes('destaque') && b.tags?.includes('destaque')) return 1
                    return 0
                })
        }

        return result
    }, [filters])

    // Funções auxiliares
    const openCarDetails = useCallback((car: CarCardProps) => {
        const fullCar = CAR_DATA.find(c => c.id === car.id)
        if (fullCar) {
            setSelectedCar(fullCar)
            setIsModalOpen(true)
        }
    }, [])

    const closeCarDetails = useCallback(() => {
        setIsModalOpen(false)
        setSelectedCar(null)
    }, [])

    const handleOptionToggle = useCallback((
        key: keyof FilterState,
        option: string
    ) => {
        setFilters(prev => {
            const current = prev[key] as string[]
            if (current.includes(option)) {
                return {
                    ...prev,
                    [key]: current.filter(item => item !== option)
                }
            } else {
                return {
                    ...prev,
                    [key]: [...current, option]
                }
            }
        })
    }, [])

    const clearAllFilters = useCallback(() => {
        setFilters({
            searchTerm: '',
            selectedTipos: [],
            selectedMarcas: [],
            selectedConditions: [],
            selectedFuels: [],
            selectedTransmissions: [],
            minPrice: MIN_PRICE_LIMIT,
            maxPrice: MAX_PRICE_LIMIT,
            sortBy: 'relevance',
        })
        
        // Limpar parâmetros da URL se vieram do chatbot
        if (searchParams.toString()) {
            router.replace('/galeria')
        }
    }, [router, searchParams])

    const activeFiltersCount = useMemo(() => {
        return [
            filters.selectedTipos.length,
            filters.selectedMarcas.length,
            filters.selectedConditions.length,
            filters.selectedFuels.length,
            filters.selectedTransmissions.length,
            filters.minPrice > MIN_PRICE_LIMIT || filters.maxPrice < MAX_PRICE_LIMIT ? 1 : 0,
            filters.searchTerm ? 1 : 0
        ].reduce((a, b) => a + b, 0)
    }, [filters])

    // Componentes de UI
    const FilterSidebar = (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-80 space-y-6"
        >
            {/* Header do Filtro */}
            <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-6 shadow-sm border border-amber-100">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-md">
                            <Sliders className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Filtros</h2>
                            <p className="text-sm text-amber-600 font-medium">
                                {filteredCars.length} veículo{filteredCars.length !== 1 ? 's' : ''} encontrado{filteredCars.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>
                    {activeFiltersCount > 0 && (
                        <button
                            onClick={clearAllFilters}
                            className="p-2 hover:bg-amber-50 rounded-lg transition-colors group"
                            title="Limpar todos os filtros"
                        >
                            <RefreshCw className="w-5 h-5 text-amber-600 group-hover:rotate-180 transition-transform" />
                        </button>
                    )}
                </div>

                {/* Busca */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Buscar veículo
                    </label>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                        <input
                            type="text"
                            placeholder="Marca, modelo, características..."
                            value={filters.searchTerm}
                            onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Filtros */}
            <div className="space-y-6">
                {/* Preço */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-amber-100">
                            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        Faixa de Preço
                    </h3>
                    <RangeSlider
                        min={MIN_PRICE_LIMIT}
                        max={MAX_PRICE_LIMIT}
                        minValue={filters.minPrice}
                        maxValue={filters.maxPrice}
                        onChange={(min, max) => setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }))}
                        formatLabel={(value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
                    />
                </div>

                {/* Tipos */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-4">Tipo de Veículo</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {TIPO_OPTIONS.map((tipo) => (
                            <FilterOption
                                key={tipo}
                                option={tipo}
                                type="tipo"
                                isSelected={filters.selectedTipos.includes(tipo)}
                                count={carCounts.tipos[tipo]}
                                onChange={() => handleOptionToggle('selectedTipos', tipo)}
                            />
                        ))}
                    </div>
                </div>

                {/* Marcas */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-4">Marca</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {MARCA_OPTIONS.map((marca) => (
                            <FilterOption
                                key={marca}
                                option={marca}
                                type="marca"
                                isSelected={filters.selectedMarcas.includes(marca)}
                                count={carCounts.marcas[marca]}
                                onChange={() => handleOptionToggle('selectedMarcas', marca)}
                            />
                        ))}
                    </div>
                </div>

                {/* Combustível */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-4">Combustível</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {FUEL_TYPES.map((fuel) => (
                            <FilterOption
                                key={fuel}
                                option={fuel}
                                type="fuel"
                                isSelected={filters.selectedFuels.includes(fuel)}
                                count={carCounts.combustiveis[fuel]}
                                onChange={() => handleOptionToggle('selectedFuels', fuel)}
                            />
                        ))}
                    </div>
                </div>

                {/* Transmissão */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-4">Transmissão</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {TRANSMISSION_TYPES.map((transmission) => (
                            <FilterOption
                                key={transmission}
                                option={transmission}
                                type="transmission"
                                isSelected={filters.selectedTransmissions.includes(transmission)}
                                count={carCounts.transmissoes[transmission]}
                                onChange={() => handleOptionToggle('selectedTransmissions', transmission)}
                            />
                        ))}
                    </div>
                </div>

                {/* Condição - Tipagem segura */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-4">Condição</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {(['Novo', 'Semi-novo', 'Usado'] as CarCondition[]).map((condition) => (
                            <FilterOption
                                key={condition}
                                option={condition}
                                isSelected={filters.selectedConditions.includes(condition)}
                                count={carCounts.condicoes[condition]}
                                onChange={() => handleOptionToggle('selectedConditions', condition)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )

    const sortOptions = [
        { value: 'relevance' as const, label: 'Mais relevantes', icon: <Star className="w-4 h-4" /> },
        { value: 'price-asc' as const, label: 'Menor preço', icon: <TrendingUp className="w-4 h-4" /> },
        { value: 'price-desc' as const, label: 'Maior preço', icon: <TrendingUp className="w-4 h-4" /> },
        { value: 'year-desc' as const, label: 'Mais novos', icon: <Car className="w-4 h-4" /> },
        { value: 'km-asc' as const, label: 'Menor KM', icon: <Car className="w-4 h-4" /> },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                Galeria de Veículos
                            </h1>
                            <p className="text-gray-600">
                                Encontre o carro perfeito para você
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            {/* Botão Filtros Mobile */}
                            <button
                                onClick={() => setIsFilterOpen(true)}
                                className="lg:hidden px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <Filter className="w-5 h-5" />
                                Filtros
                                {activeFiltersCount > 0 && (
                                    <span className="bg-white text-amber-600 text-xs px-2 py-0.5 rounded-full font-bold">
                                        {activeFiltersCount}
                                    </span>
                                )}
                            </button>

                            {/* Dropdown Ordenação */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowSortMenu(!showSortMenu)}
                                    className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-amber-400 transition-colors flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                                    </svg>
                                    <span className="font-medium text-gray-700">
                                        {sortOptions.find(opt => opt.value === filters.sortBy)?.label}
                                    </span>
                                    <svg className={`w-4 h-4 text-gray-500 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <AnimatePresence>
                                    {showSortMenu && (
                                        <>
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="fixed inset-0 z-40 lg:hidden"
                                                onClick={() => setShowSortMenu(false)}
                                            />
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
                                            >
                                                {sortOptions.map((option) => (
                                                    <button
                                                        key={option.value}
                                                        onClick={() => {
                                                            setFilters(prev => ({ ...prev, sortBy: option.value }))
                                                            setShowSortMenu(false)
                                                        }}
                                                        className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                                                            filters.sortBy === option.value 
                                                                ? 'bg-amber-50 text-amber-700' 
                                                                : 'text-gray-700'
                                                        }`}
                                                    >
                                                        <div className={`p-1.5 rounded ${
                                                            filters.sortBy === option.value 
                                                                ? 'bg-amber-600 text-white' 
                                                                : 'bg-gray-100 text-gray-600'
                                                        }`}>
                                                            {option.icon}
                                                        </div>
                                                        <span className="font-medium">{option.label}</span>
                                                    </button>
                                                ))}
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Filtros Ativos */}
                    {activeFiltersCount > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            <div className="text-sm text-gray-600 mr-2 py-1">
                                Filtros ativos:
                            </div>
                            {filters.searchTerm && (
                                <span className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium flex items-center gap-1">
                                    Busca: {filters.searchTerm}
                                    <button onClick={() => setFilters(prev => ({ ...prev, searchTerm: '' }))}>
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            )}
                            {filters.selectedTipos.map(tipo => (
                                <span key={tipo} className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium flex items-center gap-1">
                                    {tipo}
                                    <button onClick={() => handleOptionToggle('selectedTipos', tipo)}>
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                            {filters.selectedMarcas.map(marca => (
                                <span key={marca} className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium flex items-center gap-1">
                                    {marca}
                                    <button onClick={() => handleOptionToggle('selectedMarcas', marca)}>
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                            {filters.minPrice > MIN_PRICE_LIMIT || filters.maxPrice < MAX_PRICE_LIMIT ? (
                                <span className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium flex items-center gap-1">
                                    Preço: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(filters.minPrice)} - {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(filters.maxPrice)}
                                    <button onClick={() => setFilters(prev => ({ 
                                        ...prev, 
                                        minPrice: MIN_PRICE_LIMIT, 
                                        maxPrice: MAX_PRICE_LIMIT 
                                    }))}>
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ) : null}
                            <button
                                onClick={clearAllFilters}
                                className="px-3 py-1.5 bg-gray-800 hover:bg-gray-900 text-white rounded-full text-sm font-medium flex items-center gap-1 transition-colors"
                            >
                                Limpar tudo
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Desktop */}
                    <div className="hidden lg:block">
                        {FilterSidebar}
                    </div>

                    {/* Conteúdo Principal */}
                    <div className="flex-1">
                        {/* Grid de Carros */}
                        <motion.div 
                            layout 
                            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredCars.length > 0 ? (
                                    filteredCars.map((car) => {
                                        const carCardProps: CarCardProps = {
                                            id: car.id,
                                            name: car.name,
                                            brand: car.brand,
                                            model: car.model,
                                            year: car.year,
                                            price: car.price,
                                            km: car.km,
                                            tipo: car.tipo,
                                            fuel: car.fuel,
                                            transmission: car.transmission,
                                            condition: car.condition,
                                            mainImage: car.mainImage,
                                            description: car.description,
                                            estoque: car.estoque,
                                            images: car.images,
                                            tags: car.tags,
                                            details: car.details
                                        }
                                        
                                        return (
                                            <motion.div
                                                key={car.id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <CarCard 
                                                    car={carCardProps} 
                                                    onViewDetails={openCarDetails} 
                                                />
                                            </motion.div>
                                        )
                                    })
                                ) : (
                                    <motion.div
                                        key="not-found"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="col-span-full py-16 text-center"
                                    >
                                        <div className="max-w-md mx-auto">
                                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                                <Car className="w-12 h-12 text-gray-400" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                                Nenhum veículo encontrado
                                            </h3>
                                            <p className="text-gray-600 mb-6">
                                                Tente ajustar os filtros ou usar termos de busca diferentes
                                            </p>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={clearAllFilters}
                                                className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                                            >
                                                Limpar Filtros
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>

                {/* Modal Mobile Filtro */}
                <AnimatePresence>
                    {isFilterOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsFilterOpen(false)}
                                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                            />
                            
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl overflow-y-auto flex flex-col"
                            >
                                {/* Header */}
                                <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">Filtros</h2>
                                            <p className="text-sm text-gray-500">
                                                {filteredCars.length} veículo{filteredCars.length !== 1 ? 's' : ''} encontrado{filteredCars.length !== 1 ? 's' : ''}
                                            </p>
                                        </div>
                                        <button 
                                            onClick={() => setIsFilterOpen(false)}
                                            className="p-2 hover:bg-gray-100 rounded-full"
                                        >
                                            <X className="w-6 h-6 text-gray-600" />
                                        </button>
                                    </div>
                                    
                                    {/* Filtros ativos */}
                                    {activeFiltersCount > 0 && (
                                        <div className="pt-4 border-t border-gray-200">
                                            <button
                                                onClick={clearAllFilters}
                                                className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
                                            >
                                                <RefreshCw className="w-4 h-4" />
                                                Limpar todos os filtros
                                            </button>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Content */}
                                <div className="flex-1 p-6 overflow-y-auto">
                                    <div className="space-y-6">
                                        {FilterSidebar}
                                    </div>
                                </div>
                                
                                {/* Footer */}
                                <div className="sticky bottom-0 bg-white p-6 border-t border-gray-200 shadow-lg">
                                    <motion.button
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setIsFilterOpen(false)}
                                        className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold rounded-xl hover:shadow-xl transition-shadow"
                                    >
                                        Ver {filteredCars.length} Resultado{filteredCars.length !== 1 ? 's' : ''}
                                    </motion.button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Modal Detalhes */}
                <CarDetailsModal 
                    car={selectedCar} 
                    isOpen={isModalOpen} 
                    onClose={closeCarDetails} 
                />
            </div>
        </div>
    )
}

// Componente principal exportado
const GaleriaContent: React.FC = () => {
    return <GaleriaContentWithParams />
}

export default GaleriaContent