export type CarCondition = 'Novo' | 'Semi-novo' | 'Usado'

export interface CarDetails {
    motor: string
    portas: number
    airbags: number
    cor: string
    finalPlaca: string
}

export interface Car {
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
    condition: CarCondition
    mainImage: string
    description: string
    estoque: string
    images: string[]
    tags: string[]
    details: CarDetails
}

export interface CarCardProps extends Omit<Car, 'description' | 'estoque' | 'images' | 'tags' | 'details'> {
    description?: string
    estoque?: string
    images?: string[]
    tags?: string[]
    details?: CarDetails
}

// Estado dos Filtros
export interface FilterState {
    searchTerm: string
    selectedTipos: string[]
    selectedMarcas: string[]
    selectedConditions: CarCondition[]
    selectedFuels: string[]
    selectedTransmissions: string[]
    minPrice: number
    maxPrice: number
}

// Filtros do Chatbot
export interface ChatbotFilters {
    profile?: 'familia' | 'trabalho' | 'primeiro-carro' | 'cidade'
    budget?: 'ate-30' | '30-50' | '50-80' | '80-120'
    fuelType?: 'flex' | 'gasolina' | 'diesel' | 'eletrico' | 'hibrido'
    transmission?: 'automatico' | 'manual'
    usage?: 'diario' | 'viagens' | 'trabalho'
    financing?: 'sim' | 'nao'
}