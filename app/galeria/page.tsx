import { Suspense } from "react"
import GaleriaContent from "../_components/GaleriaContent"
import LoadingSpinner from "../_components/LoadingSpinner"

export default function GaleriaPage() {
  return (
    <main className="min-h-screen">
      <div className="pt-16 lg:pt-20">
        <Suspense fallback={<LoadingSpinner />}>
          <GaleriaContent />
        </Suspense>
        <GaleriaContent />
      </div>
    </main>
  )
} 