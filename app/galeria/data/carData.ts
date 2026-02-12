import { Car } from "../../types/index";

export const TIPO_OPTIONS: string[] = [
  "SUV",
  "Sedan",
  "Hatchback",
  "Pickup",
  "Esportivo",
  "Caminhão",
];

export const MARCA_OPTIONS: string[] = [
  "Toyota",
  "Volkswagen",
  "Chevrolet",
  "Fiat",
  "Ford",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Honda",
  "Nissan",
];

export const FUEL_TYPES: string[] = [
  "Gasolina",
  "Etanol",
  "Diesel",
  "Flex",
  "Elétrico",
  "Híbrido",
];

export const TRANSMISSION_TYPES: string[] = ["Automática", "Manual"];

export const CAR_DATA: Car[] = [
  {
    id: 1,
    name: "VW Gol 1.6 Copa 2006",
    brand: "Volkswagen",
    model: "Gol",
    year: 2006,
    price: 28990,
    km: 130000,
    tipo: "Hatchback",
    fuel: "Flex",
    transmission: "Manual",
    condition: "Usado",
    estoque: "1 unidade",
    mainImage: "/veiculos/vwgol/IMG_3981.jpg",
    images: [
      "/veiculos/vwgol/IMG_3981.jpg",
      "/veiculos/vwgol/IMG_3986.jpg",
      "/veiculos/vwgol/IMG_3987.jpg",
      "/veiculos/vwgol/IMG_3989.jpg",
      "/veiculos/vwgol/IMG_3990.jpg",
      "/veiculos/vwgol/IMG_3993.jpg",
      "/veiculos/vwgol/IMG_3995.jpg",
      "/veiculos/vwgol/IMG_3996.jpg"
    ],
    description:
      "VW Gol 1.6 Copa 2006 completo, motor forte e confiável, ideal para o dia a dia e manutenção acessível. Veículo bem conservado, documentação em dia e pronto para transferência.",
    tags: ["Completo", "Econômico", "Motor 1.6", "Volkswagen"],
    details: {
      motor: "1.6 Flex",
      portas: 4,
      airbags: 0,
      cor: "A definir",
      finalPlaca: "A definir",
    },
  },
];
