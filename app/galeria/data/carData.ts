import { Car } from '../../types/index'

export const TIPO_OPTIONS: string[] = [
  'SUV',
  'Sedan',
  'Hatchback',
  'Pickup',
  'Esportivo',
  'Caminhão',
]

export const MARCA_OPTIONS: string[] = [
  'Toyota',
  'Volkswagen',
  'Chevrolet',
  'Fiat',
  'Ford',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Honda',
  'Nissan',
]

export const FUEL_TYPES: string[] = [
  'Gasolina',
  'Etanol',
  'Diesel',
  'Flex',
  'Elétrico',
  'Híbrido',
]

export const TRANSMISSION_TYPES: string[] = [
  'Automática',
  'Manual',
]

export const CAR_DATA: Car[] = [
  {
    id: 1,
    name: 'Ford Fiesta Hatch 1.0 2012 Completo',
    brand: 'Ford',
    model: 'Fiesta',
    year: 2012,
    price: 31900,
    km: 0,
    tipo: 'Hatchback',
    fuel: 'Flex',
    transmission: 'Manual',
    condition: 'Semi-novo',
    estoque: '1 unidade',
    mainImage: '/veiculos/fiestahatch/fiesta.jpeg',
    images: [
      '/veiculos/fiestahatch/fiesta.jpeg',
      '/veiculos/fiestahatch/fiesta1.jpeg',
      '/veiculos/fiestahatch/fiesta2.jpeg',
      '/veiculos/fiestahatch/fiesta3.jpeg',
      '/veiculos/fiestahatch/fiesta4.jpeg',
      '/veiculos/fiestahatch/fiesta5.jpeg',
      '/veiculos/fiestahatch/fiesta6.jpeg',
      '/veiculos/fiestahatch/fiesta7.jpeg',
      '/veiculos/fiestahatch/fiesta8.mp4'
    ],
    description: 'Ford Fiesta Hatch 1.0 2012 completo, econômico e ideal para o dia a dia. Veículo revisado, documentação regularizada e pronto para entrega.',
    tags: ['Econômico', 'Completo', 'Manual'],
    details: {
      motor: '1.0 Flex',
      portas: 4,
      airbags: 2,
      cor: 'Vermelho',
      finalPlaca: '0',
    },
  },
  {
    id: 2,
    name: 'Fiat Uno 1.4 2012 Completo',
    brand: 'Fiat',
    model: 'Uno',
    year: 2012,
    price: 36990,
    km: 0,
    tipo: 'Hatchba  ck',
    fuel: 'Flex',
    transmission: 'Manual',
    condition: 'Semi-novo',
    estoque: '1 unidade',
    mainImage: '/veiculos/fiatuno/IMG_3664.jpg',
    images: [
      '/veiculos/fiatuno/IMG_3657.jpg',
      '/veiculos/fiatuno/IMG_3658.jpg',
      '/veiculos/fiatuno/IMG_3659.jpg',
      '/veiculos/fiatuno/IMG_3660.jpg',
      '/veiculos/fiatuno/IMG_3663.jpg',
      '/veiculos/fiatuno/IMG_3664.jpg',
      '/veiculos/fiatuno/IMG_3665.jpg'
    ],
    description:
      'Fiat Uno 1.4 2012 completo, econômico, ágil e perfeito para o dia a dia. Segundo dono, veículo revisado, documentação em dia e pronto para transferência.',
    tags: ['Econômico', 'Completo', 'Segundo Dono'],
    details: {
      motor: '1.4 Flex',
      portas: 4,
      airbags: 2,
      cor: 'A definir',
      finalPlaca: 'A definir',
    },
  }
]