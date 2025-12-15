import { Suspense } from "react"
import GaleriaContent from "../_components/GaleriaContent"
import LoadingSpinner from "../_components/LoadingSpinner"

export const metadata = {
  title: 'Galeria de Veículos | VCar',
  description: 'Explore nossa seleção premium de veículos novos e seminovos. Encontre o carro perfeito para você.',
}

export default function GaleriaPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <main className="min-h-screen">
        <div className="pt-16 lg:pt-20">
          <GaleriaContent />
        </div>
      </main>
    </Suspense>
  )
} 