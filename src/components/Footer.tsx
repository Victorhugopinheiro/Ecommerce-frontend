"use client";
import { useState } from 'react'
import { Minus, Music2, Plus } from 'lucide-react'
import { assets } from '../../public/assets'
import Image from 'next/image'

type FooterSectionId = 'institucional' | 'politicas' | 'ajuda' | 'troca'

type FooterSection = {
    id: FooterSectionId
    title: string
    items: string[]
}

function InstagramIcon() {
    return (
        <svg viewBox='0 0 24 24' aria-hidden='true' className='h-[18px] w-[18px]' fill='none'>
            <rect x='4' y='4' width='16' height='16' rx='5' stroke='currentColor' strokeWidth='1.8' />
            <circle cx='12' cy='12' r='4' stroke='currentColor' strokeWidth='1.8' />
            <circle cx='17.2' cy='6.8' r='1.2' fill='currentColor' />
        </svg>
    )
}

function FacebookIcon() {
    return (
        <svg viewBox='0 0 24 24' aria-hidden='true' className='h-[18px] w-[18px]' fill='currentColor'>
            <path d='M13.5 21v-7h2.3l.4-3h-2.7V9.1c0-.9.2-1.5 1.6-1.5H16V4.9c-.3 0-1.3-.1-2.4-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.4V14h2.3v7h3.8Z' />
        </svg>
    )
}

function YouTubeIcon() {
    return (
        <svg viewBox='0 0 24 24' aria-hidden='true' className='h-[18px] w-[18px]' fill='none'>
            <rect x='3.5' y='6.5' width='17' height='11' rx='3' stroke='currentColor' strokeWidth='1.8' />
            <path d='M11 10.2 14.8 12 11 13.8V10.2Z' fill='currentColor' />
        </svg>
    )
}

const footerSections: FooterSection[] = [
    {
        id: 'institucional',
        title: 'INSTITUCIONAL',
        items: ['Quem somos', 'Blog', 'Afiliados', 'Cashback'],
    },
    {
        id: 'politicas',
        title: 'POLÍTICAS',
        items: ['Termos de privacidade', 'Política de entrega', 'Política de trocas e devoluções'],
    },
    {
        id: 'ajuda',
        title: 'AJUDA',
        items: ['FAQ', 'Contato', 'Suporte'],
    },
    {
        id: 'troca',
        title: 'TROCA E DEVOLUÇÃO',
        items: ['Troque Fácil'],
    },
]

function Footer() {
    const [openSections, setOpenSections] = useState<Record<FooterSectionId, boolean>>({
        institucional: true,
        politicas: true,
        ajuda: true,
        troca: true,
    })

    const toggleSection = (id: FooterSectionId) => {
        setOpenSections((current) => ({
            ...current,
            [id]: !current[id],
        }))
    }

    return (
        <footer className='relative mt-20 overflow-hidden border-t-2 border-green-700 bg-black text-white  '>
            <div className='pointer-events-none absolute inset-y-0 right-0 hidden w-[34rem] opacity-10 lg:block'>
                <Image
                    src={assets.logo}
                    alt=''
                    aria-hidden='true'
                    className='absolute right-[-8rem] top-1/2 w-[28rem] -translate-y-1/2 rotate-[-8deg]'
                />
            </div>

            <div className='relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-[5vh] md:px-[2vh] lg:px-[8vh] lg:py-14'>
                <h2 className='text-center text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl lg:text-[3.2rem]'>
                    A MARCA MAIS PRESENTE NAS PISTAS
                </h2>

                <div className='mt-10 border-t border-white/10 pt-8 lg:pt-10'>
                    <div className='lg:hidden'>
                        <div className='flex flex-col items-center gap-6 pb-8'>
                            <Image className='w-32' src={assets.logo} alt='Alpha' />

                            <div className='flex items-center gap-3'>
                                <button
                                    type='button'
                                    aria-label='Instagram'
                                    className='flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10'
                                >
                                    <InstagramIcon />
                                </button>
                                <button
                                    type='button'
                                    aria-label='Facebook'
                                    className='flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10'
                                >
                                    <FacebookIcon />
                                </button>
                                <button
                                    type='button'
                                    aria-label='TikTok'
                                    className='flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10'
                                >
                                    <Music2 size={18} />
                                </button>
                                <button
                                    type='button'
                                    aria-label='YouTube'
                                    className='flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10'
                                >
                                    <YouTubeIcon />
                                </button>
                            </div>
                        </div>

                        <div className='border-t border-white/10'>
                            {footerSections.map((section) => {
                                const isOpen = openSections[section.id]

                                return (
                                    <div key={section.id} className='border-b border-white/10'>
                                        <button
                                            type='button'
                                            onClick={() => toggleSection(section.id)}
                                            className='flex w-full items-center justify-between py-4 text-left'
                                            aria-expanded={isOpen}
                                        >
                                            <span className='text-base font-semibold tracking-tight text-white'>
                                                {section.title}
                                            </span>
                                            {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                                        </button>

                                        {isOpen && section.items.length > 0 && (
                                            <ul className='flex flex-col gap-4 pb-4 text-sm text-white/65'>
                                                {section.items.map((item) => (
                                                    <li key={item} className='w-fit cursor-pointer transition-colors hover:text-white'>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className='hidden lg:grid lg:grid-cols-[240px_1px_minmax(0,1fr)] lg:gap-10'>
                        <div className='flex flex-col items-start gap-10 pt-4'>
                            <Image className='w-36' src={assets.logo} alt='Alpha' />

                            <div className='flex items-center gap-3'>
                                <button
                                    type='button'
                                    aria-label='Instagram'
                                    className='flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10'
                                >
                                    <InstagramIcon />
                                </button>
                                <button
                                    type='button'
                                    aria-label='Facebook'
                                    className='flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10'
                                >
                                    <FacebookIcon />
                                </button>
                                <button
                                    type='button'
                                    aria-label='TikTok'
                                    className='flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10'
                                >
                                    <Music2 size={18} />
                                </button>
                                <button
                                    type='button'
                                    aria-label='YouTube'
                                    className='flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10'
                                >
                                    <YouTubeIcon />
                                </button>
                            </div>
                        </div>

                        <div className='bg-white/10' />

                        <div className='grid grid-cols-4 gap-8 pt-4'>
                            {footerSections.map((section) => (
                                <div key={section.id}>
                                    <h3 className='mb-4 text-lg font-semibold tracking-tight text-white'>{section.title}</h3>

                                    <ul className='flex flex-col gap-4 text-sm text-white/65'>
                                        {section.items.map((item) => (
                                            <li key={item} className='w-fit cursor-pointer transition-colors hover:text-white'>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='mt-10 border-t border-white/10 pt-5'>
                    <div className='flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
                        <div className='max-w-2xl text-center text-xs leading-relaxed text-white/55 lg:text-left sm:text-sm'>
                            <p>© 2026 XXXXX. CNPJ: 000000.0000/0000-00</p>
                            <p>Rua da Amora, 250 - SP - SP | CEP: 00000-000</p>
                        </div>


                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
