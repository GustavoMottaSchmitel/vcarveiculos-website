import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

export const metadata: Metadata = {
  title: {
    default: "VCar Veículos | Compra e Venda de Carros Novos e Seminovos",
    template: "%s | VCar Veículos",
  },
  description:
    "Na VCar Veículos você encontra carros novos e seminovos com procedência, garantia e as melhores condições de financiamento. Confira nosso estoque agora!",
  keywords: [
    "carros",
    "veículos",
    "compra de carros",
    "venda de carros",
    "carros seminovos",
    "carros novos",
    "concessionária",
    "automóveis",
    "financiamento de veículos",
    "revenda de carros",
    "VCar Veículos",
  ],
  authors: [{ name: "VCar Veículos" }],
  creator: "VCar Veículos",
  publisher: "VCar Veículos",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  metadataBase: new URL("https://vcarveiculoses.com.br"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://vcarveiculoses.com.br",
    siteName: "VCar Veículos",
    title: "VCar Veículos | Compra e Venda de Carros Novos e Seminovos",
    description:
      "Carros novos e seminovos com qualidade, garantia e financiamento facilitado. Veja nosso estoque!",
    images: [
      {
        url: "/logo-no-background.png",
        width: 1200,
        height: 630,
        alt: "VCar Veículos - Compra e Venda de Carros",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VCar Veículos | Compra e Venda de Carros Novos e Seminovos",
    description:
      "Carros novos e seminovos com qualidade, garantia e financiamento facilitado.",
    images: ["/logo-no-background.png"],
  },
  icons: {
    icon: "/logo-no-background.png",
    shortcut: "logo-no-background.png",
    apple: "logo-no-background.png",
  },
  category: "automotive",
  themeColor: "#0F172A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
