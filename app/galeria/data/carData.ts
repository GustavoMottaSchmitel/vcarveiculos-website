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
      '/images/fiesta1.jpeg',
      '/images/fiesta2.jpeg',
      '/images/fiesta3.jpeg',
      '/images/fiesta4.jpeg',
      '/images/fiesta5.jpeg',
      '/images/fiesta6.jpeg',
      '/images/fiesta7.jpeg',
      '/veiculos/fiestahatch/fiesta.mp4'
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
]