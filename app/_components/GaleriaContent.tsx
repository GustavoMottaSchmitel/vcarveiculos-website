'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X, Car, Sparkles, ChevronRight } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'

import { 
    CAR_DATA, 
    TIPO_OPTIONS, 
    MARCA_OPTIONS, 
    FUEL_TYPES, 
    TRANSMISSION_TYPES 
} from '../galeria/data/carData'
import CarCard from '../galeria/_components/CarCard'
import FilterSection from '../galeria/_components/FilterSection'
import CarDetailsModal from '../galeria/_components/CarDetailsModal'
import { Car as CarType, CarCardProps, FilterState, ChatbotFilters } from '../types'

// Calcular limites de preço
const MAX_PRICE_LIMIT = Math.max(...CAR_DATA.map(car => car.price))
const MIN_PRICE_LIMIT = Math.min(...CAR_DATA.map(car => car.price))

// Converter filtros do chatbot
const convertChatbotFilters = (filters: ChatbotFilters): Partial<FilterState> => {
    const converted: Partial<FilterState> = {}

    // Perfil -> Marcas
    if (filters.profile) {
        switch (filters.profile) {
            case 'familia':
                converted.selectedMarcas = ['Toyota', 'Volkswagen', 'Chevrolet', 'Honda']
                break
            case 'trabalho':
                converted.selectedMarcas = ['Ford', 'Toyota', 'Chevrolet']
                break
            case 'primeiro-carro':
                converted.selectedMarcas = ['Chevrolet', 'Fiat', 'Volkswagen', 'Hyundai']
                break
            case 'cidade':
                converted.selectedMarcas = ['Fiat', 'Hyundai', 'Volkswagen', 'Renault']
                break
        }
    }

    // Orçamento -> Faixa de preço
    if (filters.budget) {
        switch (filters.budget) {
            case 'ate-30':
                converted.minPrice = MIN_PRICE_LIMIT
                converted.maxPrice = 30000
                break
            case '30-50':
                converted.minPrice = 30000
                converted.maxPrice = 50000
                break
            case '50-80':
                converted.minPrice = 50000
                converted.maxPrice = 80000
                break
            case '80-120':
                converted.minPrice = 80000
                converted.maxPrice = 120000
                break
        }
    }

    // Combustível
    if (filters.fuelType) {
        switch (filters.fuelType) {
            case 'flex':
                converted.selectedFuels = ['Flex']
                break
            case 'gasolina':
                converted.selectedFuels = ['Gasolina']
                break
            case 'diesel':
                converted.selectedFuels = ['Diesel']
                break
            case 'eletrico':
                converted.selectedFuels = ['Elétrico']
                break
            case 'hibrido':
                converted.selectedFuels = ['Híbrido']
                break
        }
    }

    // Transmissão
    if (filters.transmission) {
        switch (filters.transmission) {
            case 'automatico':
                converted.selectedTransmissions = ['Automática']
                break
            case 'manual':
                converted.selectedTransmissions = ['Manual']
                break
        }
    }

    // Uso -> Tipo
    if (filters.usage) {
        switch (filters.usage) {
            case 'diario':
                converted.selectedTipos = ['Hatchback', 'Sedan']
                break
            case 'viagens':
                converted.selectedTipos = ['SUV', 'Sedan']
                break
            case 'trabalho':
                converted.selectedTipos = ['Pickup', 'Caminhão']
                break
        }
    }

    return converted
}

const GaleriaContent: React.FC = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    // Extrair filtros do chatbot da URL
    const chatbotFilters = useMemo((): ChatbotFilters => {
        const params = new URLSearchParams(searchParams.toString())
        const filters: ChatbotFilters = {}

        // Extrair cada parâmetro com verificação de tipo
        const profile = params.get('profile')
        const budget = params.get('budget')
        const fuelType = params.get('fuelType')
        const transmission = params.get('transmission')
        const usage = params.get('usage')
        const financing = params.get('financing')

        // Atribuir com validação de tipo
        if (profile && ['familia', 'trabalho', 'primeiro-carro', 'cidade'].includes(profile)) {
            filters.profile = profile as ChatbotFilters['profile']
        }
        
        if (budget && ['ate-30', '30-50', '50-80', '80-120'].includes(budget)) {
            filters.budget = budget as ChatbotFilters['budget']
        }
        
        if (fuelType && ['flex', 'gasolina', 'diesel', 'eletrico', 'hibrido'].includes(fuelType)) {
            filters.fuelType = fuelType as ChatbotFilters['fuelType']
        }
        
        if (transmission && ['automatico', 'manual'].includes(transmission)) {
            filters.transmission = transmission as ChatbotFilters['transmission']
        }
        
        if (usage && ['diario', 'viagens', 'trabalho'].includes(usage)) {
            filters.usage = usage as ChatbotFilters['usage']
        }
        
        if (financing && ['sim', 'nao'].includes(financing)) {
            filters.financing = financing as ChatbotFilters['financing']
        }

        return filters
    }, [searchParams])

    const hasChatbotFilters = Object.keys(chatbotFilters).length > 0

    // Estado inicial com filtros do chatbot
    const initialFilters = useMemo(() => {
        const baseFilters: FilterState = {
            searchTerm: '',
            selectedTipos: [],
            selectedMarcas: [],
            selectedConditions: [],
            selectedFuels: [],
            selectedTransmissions: [],
            minPrice: MIN_PRICE_LIMIT,
            maxPrice: MAX_PRICE_LIMIT,
        }

        if (hasChatbotFilters) {
            const chatbotConverted = convertChatbotFilters(chatbotFilters)
            return { ...baseFilters, ...chatbotConverted }
        }

        return baseFilters
    }, [chatbotFilters, hasChatbotFilters])

    const [filters, setFilters] = useState<FilterState>(initialFilters)
    const [selectedCar, setSelectedCar] = useState<CarType | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    // Funções de controle
    const openCarDetails = useCallback((car: CarCardProps) => {
        // Encontrar o carro completo no CAR_DATA
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

    // Função para atualizar filtros com tipos seguros
    const handleFilterChange = useCallback(<K extends keyof FilterState>(
        key: K,
        value: FilterState[K]
    ) => {
        setFilters((prev: FilterState) => ({ ...prev, [key]: value }))
    }, [])

    // Função para alternar opções
    const handleOptionToggle = useCallback((
        key: keyof FilterState,
        option: string
    ) => {
        setFilters((prev: FilterState) => {
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
        })

        if (hasChatbotFilters) {
            router.replace('/galeria')
        }
    }, [hasChatbotFilters, router])

    // Filtragem principal
    const filteredCars = useMemo(() => {
        return CAR_DATA.filter(car => {
            const { 
                searchTerm, selectedTipos, selectedMarcas, 
                selectedConditions, selectedFuels, selectedTransmissions, 
                minPrice, maxPrice 
            } = filters

            // Busca
            if (searchTerm) {
                const searchLower = searchTerm.toLowerCase()
                const carText = `${car.brand} ${car.model} ${car.name}`.toLowerCase()
                if (!carText.includes(searchLower)) return false
            }

            // Filtros
            if (selectedTipos.length > 0 && !selectedTipos.includes(car.tipo)) return false
            if (selectedMarcas.length > 0 && !selectedMarcas.includes(car.brand)) return false
            if (selectedConditions.length > 0 && !selectedConditions.includes(car.condition)) return false
            if (selectedFuels.length > 0 && !selectedFuels.includes(car.fuel)) return false
            if (selectedTransmissions.length > 0 && !selectedTransmissions.includes(car.transmission)) return false
            if (car.price < minPrice || car.price > maxPrice) return false

            return true
        })
    }, [filters])

    // Componentes de UI
    const renderCheckboxes = (
        options: string[], 
        selected: string[], 
        key: keyof FilterState
    ) => (
        <div className="space-y-2">
            {options.map(option => (
                <label key={option} className="flex items-center cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={selected.includes(option)}
                        onChange={() => handleOptionToggle(key, option)}
                        className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-amber-600 transition-colors">
                        {option}
                    </span>
                </label>
            ))}
        </div>
    )

    const renderPriceRange = () => {
        const progressStart = ((filters.minPrice - MIN_PRICE_LIMIT) / (MAX_PRICE_LIMIT - MIN_PRICE_LIMIT)) * 100
        const progressEnd = ((filters.maxPrice - MIN_PRICE_LIMIT) / (MAX_PRICE_LIMIT - MIN_PRICE_LIMIT)) * 100

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">Mínimo</p>
                        <span className="text-lg font-bold text-amber-600">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(filters.minPrice)}
                        </span>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Máximo</p>
                        <span className="text-lg font-bold text-amber-600">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(filters.maxPrice)}
                        </span>
                    </div>
                </div>

                <div className="relative py-6">
                    <div className="absolute inset-0 h-2 bg-gray-200 rounded-full"></div>
                    <div 
                        className="absolute h-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                        style={{ left: `${progressStart}%`, width: `${progressEnd - progressStart}%` }}
                    ></div>
                    
                    <input
                        type="range"
                        min={MIN_PRICE_LIMIT}
                        max={MAX_PRICE_LIMIT}
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
                        className="absolute w-full h-2 opacity-0 cursor-pointer z-10"
                    />
                    <input
                        type="range"
                        min={MIN_PRICE_LIMIT}
                        max={MAX_PRICE_LIMIT}
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                        className="absolute w-full h-2 opacity-0 cursor-pointer z-10"
                    />
                </div>
            </div>
        )
    }

    // Filtros ativos
    const activeFiltersCount = useMemo(() => {
        return [
            filters.selectedTipos.length,
            filters.selectedMarcas.length,
            filters.selectedConditions.length,
            filters.selectedFuels.length,
            filters.selectedTransmissions.length,
            filters.minPrice > MIN_PRICE_LIMIT || filters.maxPrice < MAX_PRICE_LIMIT ? 1 : 0
        ].reduce((a, b) => a + b, 0)
    }, [filters])

    // Sidebar de Filtros
    const FilterSidebar = (
        <div className="lg:sticky lg:top-8 w-full lg:w-80 p-6 bg-white rounded-2xl shadow-lg border border-gray-200 h-fit">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600">
                        <Filter className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Filtros</h2>
                        <p className="text-sm text-gray-500">Encontre seu veículo</p>
                    </div>
                </div>
                <span className="px-3 py-1.5 bg-amber-600 text-white text-sm font-bold rounded-full">
                    {filteredCars.length}
                </span>
            </div>

            {/* Indicador de filtros do chatbot */}
            {hasChatbotFilters && (
                <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span className="text-sm font-semibold text-amber-700">Filtros do Assistente</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                        Baseado nas suas preferências
                    </p>
                    <button
                        onClick={clearAllFilters}
                        className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
                    >
                        Limpar filtros do assistente
                        <X className="w-3 h-3" />
                    </button>
                </div>
            )}

            <div className="space-y-6">
                <FilterSection title="Faixa de Preço" isDefaultExpanded={true}>
                    {renderPriceRange()}
                </FilterSection>

                <FilterSection title="Tipo de Veículo">
                    {renderCheckboxes(TIPO_OPTIONS, filters.selectedTipos, 'selectedTipos')}
                </FilterSection>

                <FilterSection title="Marca">
                    {renderCheckboxes(MARCA_OPTIONS, filters.selectedMarcas, 'selectedMarcas')}
                </FilterSection>

                <FilterSection title="Combustível">
                    {renderCheckboxes(FUEL_TYPES, filters.selectedFuels, 'selectedFuels')}
                </FilterSection>

                <FilterSection title="Transmissão">
                    {renderCheckboxes(TRANSMISSION_TYPES, filters.selectedTransmissions, 'selectedTransmissions')}
                </FilterSection>

                <FilterSection title="Condição">
                    {renderCheckboxes(['Novo', 'Semi-novo', 'Usado'], filters.selectedConditions, 'selectedConditions')}
                </FilterSection>
            </div>

            {/* Botão de limpar filtros */}
            {activeFiltersCount > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={clearAllFilters}
                        className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                        <X className="w-4 h-4" />
                        Limpar Todos os Filtros
                        <span className="text-xs bg-amber-600 text-white px-2 py-0.5 rounded-full">
                            {activeFiltersCount}
                        </span>
                    </motion.button>
                </div>
            )}
        </div>
    )

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="inline-flex items-center gap-3 mb-6 p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl border border-amber-200">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                                <Car className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-left">
                                <h2 className="text-xl font-bold text-gray-900">Galeria Premium</h2>
                                <p className="text-sm text-amber-600">Veículos selecionados</p>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {hasChatbotFilters ? (
                                <>
                                    Veículos <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">Recomendados</span>
                                </>
                            ) : (
                                <>
                                    Encontre seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">veículo ideal</span>
                                </>
                            )}
                        </h1>

                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            {hasChatbotFilters
                                ? 'Baseado nas suas preferências'
                                : 'Explore nossa seleção de veículos'
                            }
                        </p>
                    </motion.div>

                    {/* Badges dos filtros do chatbot */}
                    {hasChatbotFilters && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-wrap justify-center gap-3 mb-8"
                        >
                            {chatbotFilters.profile && (
                                <span className="px-4 py-2 bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 text-sm font-semibold rounded-full border border-amber-200">
                                    {chatbotFilters.profile === 'familia' && 'Para Família'}
                                    {chatbotFilters.profile === 'trabalho' && 'Para Trabalho'}
                                    {chatbotFilters.profile === 'primeiro-carro' && 'Primeiro Carro'}
                                    {chatbotFilters.profile === 'cidade' && 'Uso Urbano'}
                                </span>
                            )}
                            {chatbotFilters.budget && (
                                <span className="px-4 py-2 bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 text-sm font-semibold rounded-full border border-amber-200">
                                    {chatbotFilters.budget === 'ate-30' && 'Até R$ 30.000'}
                                    {chatbotFilters.budget === '30-50' && 'R$ 30-50 mil'}
                                    {chatbotFilters.budget === '50-80' && 'R$ 50-80 mil'}
                                    {chatbotFilters.budget === '80-120' && 'R$ 80-120 mil'}
                                </span>
                            )}
                            {chatbotFilters.fuelType && (
                                <span className="px-4 py-2 bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 text-sm font-semibold rounded-full border border-amber-200">
                                    {chatbotFilters.fuelType === 'flex' && 'Flex'}
                                    {chatbotFilters.fuelType === 'gasolina' && 'Gasolina'}
                                    {chatbotFilters.fuelType === 'diesel' && 'Diesel'}
                                    {chatbotFilters.fuelType === 'eletrico' && 'Elétrico'}
                                    {chatbotFilters.fuelType === 'hibrido' && 'Híbrido'}
                                </span>
                            )}
                        </motion.div>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Desktop */}
                    <div className="hidden lg:block">
                        {FilterSidebar}
                    </div>

                    {/* Conteúdo Principal */}
                    <div className="flex-1">
                        {/* Barra de Controles */}
                        <div className="mb-8">
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <div className="relative flex-1">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                        <Search className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Buscar marca, modelo..."
                                        value={filters.searchTerm}
                                        onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                                    />
                                </div>

                                {/* Botão Mobile Filtro */}
                                <button
                                    onClick={() => setIsFilterOpen(true)}
                                    className="lg:hidden px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg"
                                >
                                    <Filter className="w-5 h-5" />
                                    Filtros
                                    {activeFiltersCount > 0 && (
                                        <span className="bg-white text-amber-600 text-xs px-2 py-0.5 rounded-full">
                                            {activeFiltersCount}
                                        </span>
                                    )}
                                </button>
                            </div>

                            {/* Contador */}
                            <div className="flex items-center justify-between">
                                <p className="text-gray-700">
                                    <span className="font-bold text-amber-600">{filteredCars.length}</span> veículo{filteredCars.length !== 1 ? 's' : ''} encontrado{filteredCars.length !== 1 ? 's' : ''}
                                </p>
                                {activeFiltersCount > 0 && (
                                    <button
                                        onClick={clearAllFilters}
                                        className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                                    >
                                        Limpar filtros
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Grid de Carros */}
                        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                            <AnimatePresence mode="wait">
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
                                            <CarCard 
                                                key={car.id} 
                                                car={carCardProps} 
                                                onViewDetails={openCarDetails} 
                                            />
                                        )
                                    })
                                ) : (
                                    <motion.div
                                        key="not-found"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="col-span-full py-20 text-center"
                                    >
                                        <div className="max-w-md mx-auto">
                                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                                <Car className="w-10 h-10 text-gray-400" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                                Nenhum veículo encontrado
                                            </h3>
                                            <p className="text-gray-600 mb-6">
                                                {hasChatbotFilters
                                                    ? 'Tente ajustar suas preferências no assistente'
                                                    : 'Ajuste os filtros ou use nosso assistente'
                                                }
                                            </p>
                                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={clearAllFilters}
                                                    className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold rounded-xl"
                                                >
                                                    Limpar Filtros
                                                </motion.button>
                                                {!hasChatbotFilters && (
                                                    <a
                                                        href="#assistente"
                                                        className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-bold rounded-xl flex items-center justify-center gap-2"
                                                    >
                                                        <Sparkles className="w-4 h-4" />
                                                        Usar Assistente
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>

                {/* CTA Assistente */}
                {!hasChatbotFilters && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-16 text-center"
                    >
                        <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl border border-amber-200">
                            <Sparkles className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                Precisa de ajuda para escolher?
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Nosso assistente inteligente encontra o veículo perfeito para você
                            </p>
                            <a
                                href="#assistente"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold rounded-xl hover:shadow-xl transition-shadow"
                            >
                                <Sparkles className="w-5 h-5" />
                                Usar Assistente Inteligente
                                <ChevronRight className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>
                )}

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
                                transition={{ type: 'spring', damping: 30 }}
                                className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl overflow-y-auto lg:hidden"
                            >
                                <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">Filtros</h2>
                                            <p className="text-sm text-gray-500">Ajuste sua busca</p>
                                        </div>
                                        <button 
                                            onClick={() => setIsFilterOpen(false)}
                                            className="p-2 hover:bg-gray-100 rounded-full"
                                        >
                                            <X className="w-6 h-6 text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    {FilterSidebar}
                                </div>
                                
                                <div className="sticky bottom-0 bg-white p-6 border-t border-gray-200">
                                    <motion.button
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setIsFilterOpen(false)}
                                        className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold rounded-xl hover:shadow-xl"
                                    >
                                        Ver {filteredCars.length} Veículo{filteredCars.length !== 1 ? 's' : ''}
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

export default GaleriaContent