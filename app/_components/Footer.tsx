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
    ChevronRight
} from "lucide-react"

const Footer = () => {
    return (
        <footer className="bg-linear-to-b from-[#1A1206] to-[#0F0900] text-white pt-16 pb-8 mt-20 border-t-2 border-[#DAA520]/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            {/* Logo Container */}
                            <div className="relative w-40 h-20">
                                <Image
                                    src="/logo-no-background.png"
                                    alt="VCar Veículos Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        <p className="text-gray-300 leading-relaxed">
                            Há mais de 2 anos proporcionando as melhores experiências na compra e venda de veículos novos e seminovos.
                        </p>

                        <div className="flex items-center gap-4 pt-4">
                            <motion.a
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-linear-to-br from-[#1A1206] to-[#2D210F] border border-[#DAA520]/30 flex items-center justify-center hover:bg-[#DAA520]/10 transition-colors"
                            >
                                <Instagram className="w-5 h-5 text-[#FFD700]" />
                            </motion.a>

                            <motion.a
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                href="https://wa.me/5527997597886"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-linear-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center hover:opacity-90 transition-opacity"
                            >
                                <MessageCircle className="w-5 h-5 text-white" />
                            </motion.a>
                        </div>
                    </div>

                    {/* Quick Links - Versão Simplificada */}
                    
                    <div className="lg:col-span-2">
                        <h4 className="text-lg font-bold text-[#FFD700] mb-6 pb-2 border-b border-[#DAA520]/30">
                            Navegação Rápida
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                                {[
                                    { label: 'Início', href: '/' },
                                    { label: 'Galeria de Veículos', href: '/galeria' },
                                    { label: 'Assistente de Escolha', href: '/#chatbot' },
                                ].map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="flex items-center gap-2 text-gray-300 hover:text-[#FFD700] transition-colors group"
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
                                    { label: 'Nossa Localização', href: '/localizacao' },
                                ].map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="flex items-center gap-2 text-gray-300 hover:text-[#FFD700] transition-colors group"
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
                        <h4 className="text-lg font-bold text-[#FFD700] mb-6 pb-2 border-b border-[#DAA520]/30">
                            Contato
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#B8860B]/20 to-[#FFD700]/10 flex items-center justify-center shrink-0">
                                    <Phone className="w-4 h-4 text-[#FFD700]" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white text-sm">Telefone</p>
                                    <a
                                        href="tel:+5527997597886"
                                        className="text-gray-300 hover:text-[#FFD700] transition-colors text-sm"
                                    >
                                        (27) 99759-7886
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#B8860B]/20 to-[#FFD700]/10 flex items-center justify-center shrink-0">
                                    <Mail className="w-4 h-4 text-[#FFD700]" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white text-sm">E-mail</p>
                                    <a
                                        href="mailto:vcarveiculos.contato@gmail.com"
                                        className="text-gray-300 hover:text-[#FFD700] transition-colors text-sm"
                                    >
                                        vcar062024@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#B8860B]/20 to-[#FFD700]/10 flex items-center justify-center shrink-0">
                                    <Clock className="w-4 h-4 text-[#FFD700]" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white text-sm">Horário</p>
                                    <p className="text-gray-300 text-sm">
                                        Segunda a Sexta: 8h às 18h
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="py-6 border-t border-b border-[#DAA520]/30 mb-8">
                    <div className="flex flex-col md:flex-row items-center justify-around gap-4">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#FFD700]">50+</div>
                            <div className="text-sm text-gray-300">Veículos entregues</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#FFD700]">100%</div>
                            <div className="text-sm text-gray-300">Satisfação</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#FFD700]">100%</div>
                            <div className="text-sm text-gray-300">Garantia</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                
                <div className="text-center">
                    <p className="text-gray-300">
                        © {new Date().getFullYear()} VCar Veículos. Todos os direitos reservados.
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                        CNPJ: 50.982.236/0001-49 • VCAR VEICULOS LTDA
                    </p>
                </div>

                {/* WhatsApp Float Button */}

                <motion.a
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    href="https://wa.me/5527997597886"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-linear-to-r from-[#25D366] to-[#128C7E] shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all"
                >
                    <MessageCircle className="w-7 h-7 text-white" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                        <span className="text-xs font-bold text-white">!</span>
                    </div>
                </motion.a>
            </div>
        </footer>
    )
}

export default Footer