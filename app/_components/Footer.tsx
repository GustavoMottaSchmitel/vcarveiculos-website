"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
    Phone,
    Mail,
    Clock,
    Instagram,
    MessageCircle,
    ChevronRight,
    Heart
} from "lucide-react"

const Footer = () => {
    return (
        <footer className="bg-linear-to-b from-[#1A1206] to-[#0F0900] text-white pt-16 pb-8 border-t-2 border-[#DAA520]/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="relative w-40 h-20">
                                <Image
                                    src="/logo-no-background.png"
                                    alt="VCar Veículos Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        <p className="text-gray-300 leading-relaxed text-sm">
                            Transformando sonhos em realidade desde 2022. Sua melhor experiência automotiva.
                        </p>

                        <div className="flex items-center gap-4 pt-4">
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                href="https://instagram.com/vcarveiculos.es"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-[#1A1206] border border-[#DAA520]/30 flex items-center justify-center hover:bg-[#DAA520]/10 transition-colors"
                            >
                                <Instagram className="w-5 h-5 text-[#FFD700]" />
                            </motion.a>

                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                href="https://wa.me/5527997597886"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:bg-[#128C7E] transition-colors"
                            >
                                <MessageCircle className="w-5 h-5 text-white" />
                            </motion.a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2">
                        <h4 className="text-lg font-bold text-[#FFD700] mb-6 pb-2 border-b border-[#DAA520]/20">
                            Navegação
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                                {[
                                    { label: 'Início', href: '/' },
                                    { label: 'Galeria', href: '/galeria' },
                                    { label: 'Assistente', href: '/#assistente' },
                                ].map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="flex items-center gap-2 text-gray-300 hover:text-[#FFD700] transition-colors group text-sm"
                                    >
                                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                            <div className="space-y-3">
                                {[
                                    { label: 'Sobre Nós', href: '/sobre' },
                                    { label: 'Contato', href: '/contato' },
                                    { label: 'Localização', href: '/localizacao' },
                                ].map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="flex items-center gap-2 text-gray-300 hover:text-[#FFD700] transition-colors group text-sm"
                                    >
                                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold text-[#FFD700] mb-6 pb-2 border-b border-[#DAA520]/20">
                            Contato
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#1A1206] flex items-center justify-center shrink-0 border border-[#DAA520]/20">
                                    <Phone className="w-4 h-4 text-[#FFD700]" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white text-xs">Telefone</p>
                                    <a
                                        href="tel:+5527997597886"
                                        className="text-gray-300 hover:text-[#FFD700] transition-colors text-sm"
                                    >
                                        (27) 99759-7886
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#1A1206] flex items-center justify-center shrink-0 border border-[#DAA520]/20">
                                    <Mail className="w-4 h-4 text-[#FFD700]" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white text-xs">E-mail</p>
                                    <a
                                        href="mailto:vcarveiculos.contato@gmail.com"
                                        className="text-gray-300 hover:text-[#FFD700] transition-colors text-sm"
                                    >
                                        vcar062024@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#1A1206] flex items-center justify-center shrink-0 border border-[#DAA520]/20">
                                    <Clock className="w-4 h-4 text-[#FFD700]" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white text-xs">Horário</p>
                                    <p className="text-gray-300 text-sm">
                                        8h às 18h • Seg a Sex
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#DAA520]/20 mb-8"></div>

                {/* Bottom Section */}
                <div className="text-center">
                    <div className="mb-4">
                        <p className="text-gray-300">
                            © {new Date().getFullYear()} VCar Veículos. Todos os direitos reservados.
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                            CNPJ: 50.982.236/0001-49 • VCAR VEICULOS LTDA
                        </p>
                    </div>

                    {/* Developed by NuvionTech */}

                    <div className="pt-4 border-t border-[#DAA520]/10">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            href="https://www.instagram.com/nuvion.tech/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#FFD700] transition-colors text-sm"
                        >
                            <Heart className="w-3 h-3" />
                            Desenvolvido por NuvionTech
                        </motion.a>
                    </div>
                </div>

                {/* WhatsApp Float Button */}

                <motion.a
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    href="https://wa.me/5527997597886"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-xl flex items-center justify-center hover:shadow-2xl transition-all"
                >
                    <MessageCircle className="w-6 h-6 text-white" />
                </motion.a>
            </div>
        </footer>
    )
}

export default Footer