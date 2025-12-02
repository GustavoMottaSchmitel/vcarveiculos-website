import { CarChatbot } from "./_components/CarChatbot";
import HeroSection from "./_components/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen">

      <div className="pt-16 lg:pt-20">
        <HeroSection />
      </div>
      
      <CarChatbot />

      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Próxima Seção</h2>
          <p>Conteúdo adicional da sua página...</p>
        </div>
      </div>
    </main>
  );
}
