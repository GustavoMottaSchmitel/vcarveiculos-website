"use client"

import { useState, useCallback, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { 
  Filter, 
  Search, 
  Car, 
  Fuel, 
  Cog, 
  Users, 
  X,
  Info,
  Shield,
  Clock,
  MapPin,
  CheckCircle,
  MessageCircle,
  Camera,
  ChevronLeft,
  ChevronRight,
  Phone,
  Check,
  ChevronUp,
  ChevronRight as ChevronRightIcon
} from "lucide-react"

// Types
interface CarImage {
  id: number
  url: string
  alt: string
}

interface CarType {
  id: number
  name: string
  brand: string
  model: string
  price: number
  priceOriginal?: number
  year: string
  fuel: "Flex" | "Gasolina" | "Diesel" | "Elétrico"
  transmission: "Manual" | "Automático"
  km: number
  tags: string[]
  images: CarImage[]
  description: string
  condition: string
  motor: string
  portas: number
  cor: string
  garantia: string
  localizacao: string
  cidade: string
  estado: string
  conservacao: string
  cambio: string
  estoque: string
}

interface FiltersType {
  tipo: TipoOption[]
  marca: MarcaOption[]
  minPrice: string
  maxPrice: string
  minKm: string
  maxKm: string
  year: string
  fuel: string
  transmission: string
  search: string
  sortBy: "price_asc" | "price_desc" | "year_desc" | "year_asc"
}

// Constants com tipos explícitos
const TIPO_OPTIONS = ["AUTOMÓVEL", "MOTO"] as const
type TipoOption = typeof TIPO_OPTIONS[number]

const MARCA_OPTIONS = [
  "CADILLAC",
  "CHEVROLET", 
  "FIAT",
  "FORD",
  "HONDA",
  "HYUNDAI",
  "JEEP",
  "NISSAN",
  "RENAULT",
  "TOYOTA",
  "VOLKSWAGEN",
  "BMW",
  "MERCEDES",
  "AUDI",
  "PEUGEOT"
] as const
type MarcaOption = typeof MARCA_OPTIONS[number]

const FUEL_TYPES = ["Flex", "Gasolina", "Diesel", "Elétrico", "Álcool"] as const

const TRANSMISSION_TYPES = ["Manual", "Automático"] as const

const YEARS = Array.from({ length: 30 }, (_, i) => (2024 - i).toString())

// Função para gerar múltiplas imagens de exemplo
const generateCarImages = (carId: number, carName: string): CarImage[] => {
  const baseImages = [
    {
      id: 1,
      url: `https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop&v=${carId}`,
      alt: `${carName} - Vista frontal`
    },
    {
      id: 2,
      url: `https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w-800&auto=format&fit=crop&v=${carId}`,
      alt: `${carName} - Vista lateral`
    },
    {
      id: 3,
      url: `https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=800&auto=format&fit=crop&v=${carId}`,
      alt: `${carName} - Interior`
    }
  ]
  
  return baseImages
}

// Dados baseados no exemplo da Vitória Seminovos
const MOCK_CARS: CarType[] = [
  {
    id: 1,
    name: "VIRTUS TSI 1.0 R.E.X 12V 4P AUT.",
    brand: "VOLKSWAGEN",
    model: "VIRTUS",
    price: 109990,
    year: "2024/2025",
    fuel: "Flex",
    transmission: "Automático",
    km: 0,
    tags: ["Novo", "Automático", "Sedan", "0KM"],
    images: generateCarImages(1, "Volkswagen Virtus"),
    description: "Volkswagen Virtus TSI 1.0 com acabamento R.E.X. 12V 4 portas automático. Zero km, completo e com garantia. Carro novo com tecnologia de ponta, conectividade completa e segurança avançada.",
    condition: "Novo",
    motor: "1.0 TSI 128cv",
    portas: 4,
    cor: "Prata",
    garantia: "1 ano",
    localizacao: "Vitória (ES)",
    cidade: "Vitória",
    estado: "ES",
    conservacao: "Novo",
    cambio: "Automático 6 marchas",
    estoque: "Vitória (FK)"
  },
  {
    id: 2,
    name: "POLO TRACK 1.0 R.E.X 12V 5P",
    brand: "VOLKSWAGEN",
    model: "POLO",
    price: 73990,
    year: "2024/2024",
    fuel: "Flex",
    transmission: "Manual",
    km: 0,
    tags: ["Novo", "Popular", "Hatch", "Econômico"],
    images: generateCarImages(2, "Volkswagen Polo"),
    description: "Volkswagen Polo Track 1.0 com acabamento R.E.X. 12V 5 portas. Econômico e ideal para cidade. Design moderno e espaçoso.",
    condition: "Novo",
    motor: "1.0 MSI 84cv",
    portas: 5,
    cor: "Branco",
    garantia: "1 ano",
    localizacao: "Vitória (ES)",
    cidade: "Vitória",
    estado: "ES",
    conservacao: "Novo",
    cambio: "Manual 5 marchas",
    estoque: "Vitória (FK)"
  },
  {
    id: 3,
    name: "SENTRA DXC CVT",
    brand: "NISSAN",
    model: "SENTRA",
    price: 139990,
    priceOriginal: 149990,
    year: "2023/2023",
    fuel: "Flex",
    transmission: "Automático",
    km: 15000,
    tags: ["Premium", "Sedan", "Conforto", "Semi-novo"],
    images: generateCarImages(3, "Nissan Sentra"),
    description: "Nissan Sentra DXC CVT completo, com todos os opcionais. Carro seminovo em excelente estado. Bancos de couro, multimídia e câmera de ré.",
    condition: "Semi-novo",
    motor: "2.0 16V 149cv",
    portas: 4,
    cor: "Preto",
    garantia: "6 meses",
    localizacao: "Vitória (ES)",
    cidade: "Vitória",
    estado: "ES",
    conservacao: "Excelente",
    cambio: "CVT",
    estoque: "Vitória (ES)"
  },
  {
    id: 4,
    name: "CRUZE LTZ 1.8 16V AUT.",
    brand: "CHEVROLET",
    model: "CRUZE",
    price: 89990,
    year: "2021/2022",
    fuel: "Flex",
    transmission: "Automático",
    km: 35000,
    tags: ["Sedan", "Conforto", "Automático", "Premium"],
    images: generateCarImages(4, "Chevrolet Cruze"),
    description: "Chevrolet Cruze LTZ 1.8 completo, com teto solar, bancos de couro e multimídia. Carro revisado e com documentação em dia.",
    condition: "Semi-novo",
    motor: "1.8 16V 138cv",
    portas: 4,
    cor: "Cinza Metálico",
    garantia: "3 meses",
    localizacao: "Serra (ES)",
    cidade: "Serra",
    estado: "ES",
    conservacao: "Muito Boa",
    cambio: "Automático 6 marchas",
    estoque: "Serra (ES)"
  },
  {
    id: 5,
    name: "COROLLA XEI 2.0 16V AUT.",
    brand: "TOYOTA",
    model: "COROLLA",
    price: 125990,
    priceOriginal: 135990,
    year: "2022/2023",
    fuel: "Flex",
    transmission: "Automático",
    km: 22000,
    tags: ["Confiável", "Sedan", "Econômico", "Toyota"],
    images: generateCarImages(5, "Toyota Corolla"),
    description: "Toyota Corolla XEI 2.0, seminovo com pouquíssimo uso. Manutenção em dia e revisões feitas na concessionária.",
    condition: "Semi-novo",
    motor: "2.0 16V 177cv",
    portas: 4,
    cor: "Prata",
    garantia: "6 meses",
    localizacao: "Vila Velha (ES)",
    cidade: "Vila Velha",
    estado: "ES",
    conservacao: "Excelente",
    cambio: "CVT",
    estoque: "Vila Velha (ES)"
  },
  {
    id: 6,
    name: "COMPASS LIMITED 4X2 1.3 T270 AUT.",
    brand: "JEEP",
    model: "COMPASS",
    price: 159990,
    year: "2023/2023",
    fuel: "Flex",
    transmission: "Automático",
    km: 18000,
    tags: ["SUV", "Premium", "Jeep", "Turbinado"],
    images: generateCarImages(6, "Jeep Compass"),
    description: "Jeep Compass Limited 1.3 T270 automático. SUV completo com tecnologia Uconnect e bancos de couro.",
    condition: "Semi-novo",
    motor: "1.3 Turbo 185cv",
    portas: 4,
    cor: "Branco",
    garantia: "1 ano",
    localizacao: "Vitória (ES)",
    cidade: "Vitória",
    estado: "ES",
    conservacao: "Novo",
    cambio: "Automático 9 marchas",
    estoque: "Vitória (ES)"
  }
]

// Componentes reutilizáveis
const PriceTag = ({ price, originalPrice }: { price: number, originalPrice?: number }) => (
  <div className="text-right">
    {originalPrice && (
      <div className="text-gray-500 text-sm line-through mb-1">
        R$ {originalPrice.toLocaleString('pt-BR')}
      </div>
    )}
    <div className="bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-white px-4 py-2 rounded-lg font-bold text-lg shadow-lg">
      R$ {price.toLocaleString('pt-BR')}
    </div>
  </div>
)

const FilterSection = ({ 
  title, 
  children,
  expanded = true
}: { 
  title: string; 
  children: React.ReactNode;
  expanded?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded)

  return (
    <div className="space-y-3 mb-4">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex justify-between items-center w-full"
      >
        <h3 className="text-base font-semibold text-gray-800">
          {title}
        </h3>
        <ChevronUp className={`w-4 h-4 text-[#B8860B] transition-transform ${isExpanded ? '' : 'rotate-180'}`} />
      </button>
      {isExpanded && children}
    </div>
  )
}

// Componente de Galeria de Imagens
const CarImageGallery = ({ 
  images, 
  carName 
}: { 
  images: CarImage[]
  carName: string 
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      {/* Imagem Principal */}
      <div className="relative h-64 md:h-96 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <Image
          src={images[selectedImageIndex].url}
          alt={images[selectedImageIndex].alt}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          priority
        />
        
        {/* Contador de Imagens */}
        <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm">
          <Camera className="w-4 h-4 inline mr-2" />
          {selectedImageIndex + 1} / {images.length}
        </div>

        {/* Navegação */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevImage}
            className="w-10 h-10 rounded-full bg-black/70 flex items-center justify-center hover:bg-black/90 transition-colors shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextImage}
            className="w-10 h-10 rounded-full bg-black/70 flex items-center justify-center hover:bg-black/90 transition-colors shadow-lg"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </motion.button>
        </div>
      </div>

      {/* Miniaturas */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <motion.button
            key={image.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImageIndex(index)}
            className={`relative flex-shrink-0 w-20 h-16 rounded overflow-hidden border-2 transition-all shadow ${
              selectedImageIndex === index 
                ? 'border-[#DAA520] scale-105' 
                : 'border-transparent hover:border-[#B8860B]'
            }`}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="80px"
            />
          </motion.button>
        ))}
      </div>
    </div>
  )
}

// Modal Component
interface CarDetailsModalProps {
  car: CarType | null
  isOpen: boolean
  onClose: () => void
}

const CarDetailsModal = ({ car, isOpen, onClose }: CarDetailsModalProps) => {
  if (!isOpen || !car) return null

  const whatsappNumber = "5527997597886"
  const whatsappMessage = `Olá! Tenho interesse no veículo ${car.brand} ${car.name} - ${car.year} (R$ ${car.price.toLocaleString('pt-BR')}). Poderia me passar mais informações?`
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-6xl bg-gradient-to-br from-[#1A1206] to-[#2D210F] border-2 border-[#DAA520]/30 rounded-2xl overflow-hidden max-h-[95vh] flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 bg-gradient-to-r from-[#1A1206] to-[#2D210F] border-b border-[#DAA520]/30">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">{car.brand} {car.model}</h2>
              <p className="text-[#DAA520]">{car.name} • {car.year} • {car.cor}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#2D210F] rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-[#DAA520]" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
              {/* Galeria de Imagens */}
              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-[#FFD700] mb-2 flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Galeria de Fotos
                  </h3>
                  <CarImageGallery images={car.images} carName={car.name} />
                </div>

                {/* Preço */}
                <div className="mt-6">
                  <div className="bg-gradient-to-r from-[#B8860B] to-[#FFD700] text-gray-900 py-4 px-8 rounded-xl font-bold text-2xl text-center shadow-lg">
                    R$ {car.price.toLocaleString('pt-BR')}
                    {car.priceOriginal && (
                      <div className="text-gray-700 text-sm mt-1 line-through">
                        De: R$ {car.priceOriginal.toLocaleString('pt-BR')}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Detalhes */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#FFD700] mb-3 border-b border-[#DAA520]/30 pb-2">Descrição Detalhada</h3>
                  <p className="text-gray-300 leading-relaxed">{car.description}</p>
                </div>

                {/* Especificações Técnicas */}
                <div>
                  <h3 className="text-lg font-semibold text-[#FFD700] mb-4 border-b border-[#DAA520]/30 pb-2">Especificações Técnicas</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Fuel, label: "Combustível", value: car.fuel },
                      { icon: Cog, label: "Câmbio", value: car.transmission },
                      { icon: Car, label: "Motor", value: car.motor },
                      { icon: Users, label: "Portas", value: car.portas },
                      { icon: Clock, label: "Kilometragem", value: `${car.km.toLocaleString('pt-BR')} km` },
                      { icon: MapPin, label: "Localização", value: car.localizacao },
                    ].map((spec, index) => (
                      <div key={index} className="bg-[#1A1206]/50 p-4 rounded-xl border border-[#DAA520]/20">
                        <div className="flex items-center gap-2 mb-2">
                          <spec.icon className="w-5 h-5 text-[#FFD700]" />
                          <span className="text-gray-300 font-medium">{spec.label}</span>
                        </div>
                        <p className="text-white text-lg font-semibold">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Informações Adicionais */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-[#1A1206] to-[#2D210F] p-4 rounded-xl border border-[#DAA520]/20">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-[#FFD700]" />
                      <span className="text-gray-300 font-medium">Condição</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-white font-semibold">{car.condition}</p>
                      <p className="text-gray-300 text-sm">{car.conservacao}</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#1A1206] to-[#2D210F] p-4 rounded-xl border border-[#DAA520]/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-5 h-5 text-[#FFD700]" />
                      <span className="text-gray-300 font-medium">Garantia</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-white font-semibold text-lg">{car.garantia}</p>
                      <p className="text-gray-300 text-sm">Garantia do vendedor para sua tranquilidade</p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-lg font-semibold text-[#FFD700] mb-3 border-b border-[#DAA520]/30 pb-2">Características</h3>
                  <div className="flex flex-wrap gap-2">
                    {car.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-2 bg-gradient-to-r from-[#B8860B]/20 to-[#FFD700]/10 text-[#FFD700] border border-[#DAA520]/30 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-[#DAA520]/30 bg-[#1A1206]/50">
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity shadow-lg"
              >
                <MessageCircle className="w-6 h-6" />
                Falar no WhatsApp
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+5527997597886"
                className="flex-1 py-4 px-6 bg-gradient-to-r from-[#1A1206] to-[#2D210F] border-2 border-[#DAA520] text-[#FFD700] font-bold rounded-xl hover:bg-[#DAA520]/10 transition-colors text-lg flex items-center justify-center gap-3 shadow-lg"
              >
                <Phone className="w-6 h-6" />
                Ligar Agora
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

// Função auxiliar para verificar tipos
const isValidTipoOption = (value: string): value is TipoOption => {
  return TIPO_OPTIONS.includes(value as TipoOption)
}

const isValidMarcaOption = (value: string): value is MarcaOption => {
  return MARCA_OPTIONS.includes(value as MarcaOption)
}

const isValidSortByOption = (value: string): value is FiltersType['sortBy'] => {
  return ['price_asc', 'price_desc', 'year_desc', 'year_asc'].includes(value)
}

// Componente principal que usa useSearchParams
const GaleriaContentInner = () => {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<FiltersType>(() => {
    // Extrair filtros da URL com validação de tipos
    const search = searchParams.get('search') || ''
    const marcaParam = searchParams.get('marca')?.split(',') || []
    const tipoParam = searchParams.get('tipo')?.split(',') || []
    const sortByParam = searchParams.get('sortBy')
    
    return {
      tipo: tipoParam.filter((t): t is TipoOption => isValidTipoOption(t)),
      marca: marcaParam.filter((m): m is MarcaOption => isValidMarcaOption(m)),
      minPrice: searchParams.get('minPrice') || "",
      maxPrice: searchParams.get('maxPrice') || "",
      minKm: searchParams.get('minKm') || "",
      maxKm: searchParams.get('maxKm') || "",
      year: searchParams.get('year') || "",
      fuel: searchParams.get('fuel') || "",
      transmission: searchParams.get('transmission') || "",
      search: search,
      sortBy: sortByParam && isValidSortByOption(sortByParam) ? sortByParam : "year_desc"
    }
  })
  const [showFilters, setShowFilters] = useState(true)
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const carsWithSingleImage = useMemo(() => 
    MOCK_CARS.map(car => ({
      ...car,
      image: car.images[0]?.url || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop"
    }))
  , [])

  // Filtragem otimizada
  const filteredCars = useMemo(() => {
    const filtered = carsWithSingleImage.filter((car) => {
      // Filtro de busca
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        if (
          !car.name.toLowerCase().includes(searchLower) &&
          !car.brand.toLowerCase().includes(searchLower) &&
          !car.model.toLowerCase().includes(searchLower)
        ) {
          return false
        }
      }

      // Filtro de tipo
      if (filters.tipo.length > 0) {
        const carType = car.condition.toLowerCase().includes('moto') ? 'MOTO' : 'AUTOMÓVEL'
        if (!filters.tipo.includes(carType as TipoOption)) return false
      }

      // Filtro de marca
      if (filters.marca.length > 0 && !filters.marca.includes(car.brand.toUpperCase() as MarcaOption)) {
        return false
      }

      // Filtro de preço
      if (filters.minPrice) {
        const minPrice = parseInt(filters.minPrice)
        if (isNaN(minPrice) || car.price < minPrice) return false
      }
      
      if (filters.maxPrice) {
        const maxPrice = parseInt(filters.maxPrice)
        if (isNaN(maxPrice) || car.price > maxPrice) return false
      }

      // Filtro de km
      if (filters.minKm) {
        const minKm = parseInt(filters.minKm)
        if (isNaN(minKm) || car.km < minKm) return false
      }
      
      if (filters.maxKm) {
        const maxKm = parseInt(filters.maxKm)
        if (isNaN(maxKm) || car.km > maxKm) return false
      }

      // Filtro de ano
      if (filters.year) {
        const carYear = parseInt(car.year.split('/')[0])
        const filterYear = parseInt(filters.year)
        if (isNaN(carYear) || isNaN(filterYear) || carYear < filterYear) return false
      }

      // Filtro de combustível
      if (filters.fuel && car.fuel !== filters.fuel) return false

      // Filtro de transmissão
      if (filters.transmission && car.transmission !== filters.transmission) return false

      return true
    })

    // Ordenação
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price_asc':
          return a.price - b.price
        case 'price_desc':
          return b.price - a.price
        case 'year_desc':
          return parseInt(b.year.split('/')[0]) - parseInt(a.year.split('/')[0])
        case 'year_asc':
          return parseInt(a.year.split('/')[0]) - parseInt(b.year.split('/')[0])
        default:
          return b.id - a.id
      }
    })

    return filtered
  }, [filters, carsWithSingleImage])

  const clearFilters = useCallback(() => {
    setFilters({
      tipo: [],
      marca: [],
      minPrice: "",
      maxPrice: "",
      minKm: "",
      maxKm: "",
      year: "",
      fuel: "",
      transmission: "",
      search: "",
      sortBy: "year_desc"
    })
  }, [])

  const toggleTipo = useCallback((tipo: TipoOption) => {
    setFilters(prev => ({
      ...prev,
      tipo: prev.tipo.includes(tipo) 
        ? prev.tipo.filter(t => t !== tipo)
        : [...prev.tipo, tipo]
    }))
  }, [])

  const toggleMarca = useCallback((marca: MarcaOption) => {
    setFilters(prev => ({
      ...prev,
      marca: prev.marca.includes(marca) 
        ? prev.marca.filter(m => m !== marca)
        : [...prev.marca, marca]
    }))
  }, [])

  const handleFilterChange = useCallback(<K extends keyof FiltersType>(
    key: K,
    value: FiltersType[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])

  const handleViewDetails = useCallback((car: typeof carsWithSingleImage[0]) => {
    const fullCar = MOCK_CARS.find(c => c.id === car.id)
    if (fullCar) {
      setSelectedCar(fullCar)
      setIsModalOpen(true)
    }
  }, [])

  const activeFilterCount = useMemo(() => {
    return Object.entries(filters).reduce((count, [key, value]) => {
      if (key === 'search' && value) return count + 1
      if (key === 'sortBy') return count // Não contar sortBy
      if (Array.isArray(value)) return count + value.length
      if (value && value !== "") return count + 1
      return count
    }, 0)
  }, [filters])

  return (
    <>
      <div id="gallery" className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
        {/* Header */}
        <header className="relative overflow-hidden bg-gradient-to-r from-[#1A1206] via-[#2D210F] to-[#1A1206] border-b-4 border-[#DAA520]">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-20"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#B8860B]/20 to-[#FFD700]/10 border border-[#DAA520]/30 px-6 py-3 rounded-full backdrop-blur-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B8860B] to-[#FFD700] flex items-center justify-center shadow-lg">
                  <Car className="w-4 h-4 text-gray-900" />
                </div>
                <span className="text-[#FFD700] font-bold text-sm tracking-wider">VCAR VEÍCULOS</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold">
                <span className="text-white">VEÍCULOS EM </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B8860B] to-[#FFD700]">ESTOQUE</span>
              </h1>

              <p className="text-gray-300 max-w-2xl mx-auto">
                Confira nossa seleção completa de veículos novos e seminovos com as melhores condições do mercado
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Barra de busca */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B8860B]" />
                <input
                  type="text"
                  placeholder="Buscar veículos por marca, modelo ou características..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#DAA520]/30 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:border-[#DAA520] shadow-lg"
                />
              </div>
            </div>

            {/* Contador e ordenação */}
            <div className="flex items-center gap-4">
              <div className="bg-white px-4 py-2 rounded-xl border-2 border-[#DAA520]/30 shadow-lg">
                <span className="font-bold text-[#B8860B] text-lg">{filteredCars.length}</span>
                <span className="ml-2 text-gray-700">veículos</span>
              </div>

              <select
                value={filters.sortBy}
                onChange={(e) => {
                  const value = e.target.value
                  if (isValidSortByOption(value)) {
                    handleFilterChange('sortBy', value)
                  }
                }}
                className="px-4 py-2 bg-white border-2 border-[#DAA520]/30 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#DAA520] shadow-lg"
              >
                <option value="year_desc">Mais novos primeiro</option>
                <option value="year_asc">Mais antigos primeiro</option>
                <option value="price_desc">Maior preço</option>
                <option value="price_asc">Menor preço</option>
              </select>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-white font-semibold rounded-xl flex items-center gap-2 shadow-lg"
              >
                <Filter className="w-5 h-5" />
                {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
              </motion.button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filtros Sidebar */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, x: -20, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 'auto' }}
                  exit={{ opacity: 0, x: -20, width: 0 }}
                  className="lg:w-1/4"
                >
                  <div className="bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-2xl p-6 border-2 border-[#DAA520]/20 mb-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Filter className="w-5 h-5 text-[#B8860B]" />
                        Filtrar resultado
                      </h2>
                      {activeFilterCount > 0 && (
                        <button
                          onClick={clearFilters}
                          className="text-sm text-[#B8860B] hover:text-[#DAA520] flex items-center gap-1"
                        >
                          <X className="w-4 h-4" />
                          Limpar
                        </button>
                      )}
                    </div>

                    {/* Tipo */}
                    <FilterSection title="Tipo">
                      <div className="space-y-2">
                        {TIPO_OPTIONS.map((tipo) => (
                          <motion.button
                            key={tipo}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleTipo(tipo)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between ${
                              filters.tipo.includes(tipo)
                                ? 'bg-gradient-to-r from-[#B8860B]/20 to-[#FFD700]/10 border-2 border-[#DAA520] text-[#B8860B]'
                                : 'bg-gray-100 border border-gray-300 text-gray-700 hover:border-[#B8860B]'
                            }`}
                          >
                            <span>{tipo}</span>
                            {filters.tipo.includes(tipo) && (
                              <Check className="w-4 h-4" />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </FilterSection>

                    {/* Marca */}
                    <FilterSection title="Marca">
                      <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                        {MARCA_OPTIONS.map((marca) => (
                          <motion.button
                            key={marca}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleMarca(marca)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between ${
                              filters.marca.includes(marca)
                                ? 'bg-gradient-to-r from-[#B8860B]/20 to-[#FFD700]/10 border-2 border-[#DAA520] text-[#B8860B]'
                                : 'bg-gray-100 border border-gray-300 text-gray-700 hover:border-[#B8860B]'
                            }`}
                          >
                            <span>{marca}</span>
                            {filters.marca.includes(marca) && (
                              <Check className="w-4 h-4" />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </FilterSection>

                    {/* Preço */}
                    <FilterSection title="Preço">
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">De</label>
                          <input
                            type="number"
                            placeholder="R$ Mínimo"
                            value={filters.minPrice}
                            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                            className="w-full px-3 py-2 bg-white border-2 border-[#DAA520]/30 rounded-lg text-gray-700 focus:ring-2 focus:ring-[#DAA520] focus:border-[#DAA520] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Até</label>
                          <input
                            type="number"
                            placeholder="R$ Máximo"
                            value={filters.maxPrice}
                            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                            className="w-full px-3 py-2 bg-white border-2 border-[#DAA520]/30 rounded-lg text-gray-700 focus:ring-2 focus:ring-[#DAA520] focus:border-[#DAA520] outline-none"
                          />
                        </div>
                      </div>
                    </FilterSection>

                    {/* Km */}
                    <FilterSection title="Km" expanded={false}>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">De</label>
                          <input
                            type="number"
                            placeholder="Km mínimo"
                            value={filters.minKm}
                            onChange={(e) => handleFilterChange('minKm', e.target.value)}
                            className="w-full px-3 py-2 bg-white border-2 border-[#DAA520]/30 rounded-lg text-gray-700 focus:ring-2 focus:ring-[#DAA520] focus:border-[#DAA520] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Até</label>
                          <input
                            type="number"
                            placeholder="Km máximo"
                            value={filters.maxKm}
                            onChange={(e) => handleFilterChange('maxKm', e.target.value)}
                            className="w-full px-3 py-2 bg-white border-2 border-[#DAA520]/30 rounded-lg text-gray-700 focus:ring-2 focus:ring-[#DAA520] focus:border-[#DAA520] outline-none"
                          />
                        </div>
                      </div>
                    </FilterSection>

                    {/* Ano */}
                    <FilterSection title="Ano" expanded={false}>
                      <select
                        value={filters.year}
                        onChange={(e) => handleFilterChange('year', e.target.value)}
                        className="w-full px-3 py-2 bg-white border-2 border-[#DAA520]/30 rounded-lg text-gray-700 focus:ring-2 focus:ring-[#DAA520] focus:border-[#DAA520] outline-none"
                      >
                        <option value="">Todos os anos</option>
                        {YEARS.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </FilterSection>

                    {/* Combustível */}
                    <FilterSection title="Combustível" expanded={false}>
                      <select
                        value={filters.fuel}
                        onChange={(e) => handleFilterChange('fuel', e.target.value)}
                        className="w-full px-3 py-2 bg-white border-2 border-[#DAA520]/30 rounded-lg text-gray-700 focus:ring-2 focus:ring-[#DAA520] focus:border-[#DAA520] outline-none"
                      >
                        <option value="">Todos</option>
                        {FUEL_TYPES.map(fuel => (
                          <option key={fuel} value={fuel}>{fuel}</option>
                        ))}
                      </select>
                    </FilterSection>

                    {/* Transmissão */}
                    <FilterSection title="Transmissão" expanded={false}>
                      <select
                        value={filters.transmission}
                        onChange={(e) => handleFilterChange('transmission', e.target.value)}
                        className="w-full px-3 py-2 bg-white border-2 border-[#DAA520]/30 rounded-lg text-gray-700 focus:ring-2 focus:ring-[#DAA520] focus:border-[#DAA520] outline-none"
                      >
                        <option value="">Todas</option>
                        {TRANSMISSION_TYPES.map(trans => (
                          <option key={trans} value={trans}>{trans}</option>
                        ))}
                      </select>
                    </FilterSection>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Content */}
            <div className={`${showFilters ? 'lg:w-3/4' : 'w-full'}`}>
              {/* Active Filters */}
              {activeFilterCount > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {filters.tipo.map((tipo) => (
                      <span key={tipo} className="px-3 py-1 bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-white rounded-full text-sm flex items-center gap-1">
                        {tipo}
                        <button onClick={() => toggleTipo(tipo)} className="ml-1 hover:text-gray-300">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {filters.marca.map((marca) => (
                      <span key={marca} className="px-3 py-1 bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-white rounded-full text-sm flex items-center gap-1">
                        {marca}
                        <button onClick={() => toggleMarca(marca)} className="ml-1 hover:text-gray-300">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {(filters.minPrice || filters.maxPrice) && (
                      <span className="px-3 py-1 bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-white rounded-full text-sm flex items-center gap-1">
                        Preço: {filters.minPrice ? `R$ ${parseInt(filters.minPrice).toLocaleString('pt-BR')}` : 'Qualquer'} - {filters.maxPrice ? `R$ ${parseInt(filters.maxPrice).toLocaleString('pt-BR')}` : 'Qualquer'}
                        <button onClick={() => handleFilterChange('minPrice', '')} className="ml-1 hover:text-gray-300">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Cars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <motion.article
                    key={car.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8 }}
                    className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#DAA520]"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <Image
                        src={car.image}
                        alt={car.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        priority={car.id <= 3}
                      />

                      {/* Condition Badge */}
                      <div className="absolute top-3 left-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          car.condition === 'Novo' 
                            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                            : 'bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-white'
                        }`}>
                          {car.condition}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="absolute top-3 right-3">
                        <PriceTag price={car.price} originalPrice={car.priceOriginal} />
                      </div>

                      {/* Estoque */}
                      <div className="absolute bottom-3 left-3">
                        <div className="bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                          {car.estoque}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="mb-3">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{car.brand} {car.model}</h3>
                          <span className="text-[#B8860B] font-bold">{car.year}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{car.name}</p>
                      </div>

                      {/* Specs */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <Fuel className="w-4 h-4 text-[#B8860B]" />
                          <span className="text-gray-700 text-sm">{car.fuel}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Cog className="w-4 h-4 text-[#B8860B]" />
                          <span className="text-gray-700 text-sm">{car.transmission}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-[#B8860B]" />
                          <span className="text-gray-700 text-sm">{car.km === 0 ? '0KM' : `${car.km.toLocaleString('pt-BR')} km`}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#B8860B]" />
                          <span className="text-gray-700 text-sm">{car.cidade}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {car.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gradient-to-r from-[#B8860B]/10 to-[#FFD700]/5 text-[#B8860B] border border-[#DAA520]/30 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleViewDetails(car)}
                        className="w-full py-3 bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-white font-bold rounded-lg hover:from-[#DAA520] hover:to-[#FFD700] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                      >
                        <Info className="w-5 h-5" />
                        Ver mais detalhes
                      </motion.button>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Empty State */}
              {filteredCars.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border-2 border-[#DAA520]/20"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#B8860B]/20 to-[#FFD700]/20 flex items-center justify-center">
                    <Search className="w-10 h-10 text-[#B8860B]" />
                  </div>
                  <h3 className="text-2xl text-gray-800 mb-3">Nenhum veículo encontrado</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Não encontramos veículos que correspondam aos seus critérios. Tente ajustar os filtros ou a busca.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFilters}
                    className="px-6 py-3 bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-white font-bold rounded-lg hover:from-[#DAA520] hover:to-[#FFD700] transition-all shadow-lg"
                  >
                    Limpar Filtros
                  </motion.button>
                </motion.div>
              )}

              {/* CTA */}
              {filteredCars.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-12 text-center"
                >
                  <div className="inline-flex flex-col items-center gap-6 p-8 bg-gradient-to-r from-[#1A1206] to-[#2D210F] rounded-2xl shadow-2xl border-2 border-[#DAA520]/30">
                    <p className="text-xl text-white">
                      Não encontrou o veículo ideal? <span className="text-[#FFD700] font-bold">Entre em contato!</span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://wa.me/5527997597886"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center gap-3 shadow-lg"
                      >
                        <MessageCircle className="w-6 h-6" />
                        WhatsApp
                        <ChevronRightIcon className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="tel:+5527997597886"
                        className="px-8 py-4 bg-gradient-to-r from-[#1A1206] to-[#2D210F] border-2 border-[#DAA520] text-[#FFD700] font-bold rounded-xl hover:bg-[#DAA520]/10 transition-all flex items-center gap-3 shadow-lg"
                      >
                        <Phone className="w-6 h-6" />
                        Ligar Agora
                        <ChevronRightIcon className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modal de Detalhes */}
      <CarDetailsModal 
        car={selectedCar} 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false)
          setSelectedCar(null)
        }} 
      />
    </>
  )
}

// Componente wrapper com Suspense
export default function GaleriaContent() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#DAA520] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando galeria...</p>
        </div>
      </div>
    }>
      <GaleriaContentInner />
    </Suspense>
  )
}