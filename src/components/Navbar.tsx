'use client'

import Link from "next/link";

import cavernaNerds from '../../public/cavernaNerds.jpg'
import dropdownIcon from '../../public/dropdown_icon.png'
import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { AuthContext } from '../context/authContext'
import SecondNavbar from './SecondNavbar'
import Search from './Search'
import SearchMobile from './SearchMobile'
import { Menu, ShoppingCart, User, } from 'lucide-react'
import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'
// Category mega-menus shown in the navbar. Hovering previews the subcategories;
// clicking a label or subcategory link navigates to the backend-filtered Collection page.
const categoryMenus = [
    {
        label: 'COLEÇÃO',
        category: 'Men',
        subCategories: [
            { label: 'Camisetas', value: 'Topwear' },
            { label: 'Agasalhos', value: 'Winterwear' },
            { label: 'Bermudas', value: 'Bottomwear' },
        ],
    }
]

// Desktop section linking to the Collection page, pre-filtered through the URL.
const categoryLinks = [
    { label: 'Todos produtos', to: '/collection' },
    ...categoryMenus.flatMap((menu) =>
        menu.subCategories.map((sub) => ({
            label: sub.label,
            to: `/collection?category=${menu.category}&subCategory=${sub.value}`,
        }))
    ),
]

const Navbar = () => {

    const [controlMenu, setControlMenu] = useState(false)
    const [openMobileCategory, setOpenMobileCategory] = useState<string | null>(null)
    const { cart, cartToggle, setCartToggle } = useContext(ShopContext)!;
    const { authenticated } = useContext(AuthContext)!;
    const [activeMenu, setActiveMenu] = useState<string | null>(null)


    return (
        <div className='relative bg-black   w-full'>
            <div className='md:relative  max-h-96 w-full  ' onMouseLeave={() => setActiveMenu(null)}>
                <SecondNavbar />
                <div className='flex flex-col'>

                    <div className='flex justify-evenly items-center py-5 px-4 font-medium'>
                        <Link href={'/'}><Image className='w-36' src={cavernaNerds} alt='' /></Link>

                        <Search />



                        <div className='flex gap-5 items-center'>


                            <div className='group relative'>
                                {authenticated ? <>

                                    <User color="white" size={25} className=' cursor-pointer' />

                                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-white text-black'>
                                            <Link href={'/'} className='cursor-pointer hover:text-green-700'>Meu Perfil</Link>
                                            <Link href={'/orders'} className='cursor-pointer hover:text-green-700'>Pedidos</Link>
                                            <p  className='cursor-pointer hover:text-green-700'>Sair</p>
                                        </div>
                                    </div>
                                </>
                                    : <>
                                        <Link href={'/login'}>
                                            <User color="white" size={25} className='cursor-pointer' />
                                        </Link>



                                    </>}
                            </div>

                            <div onClick={() => setCartToggle(!cartToggle)} className='relative '>
                                <ShoppingCart color="white" size={25} />
                                <p className='absolute right-[-5px] bottom-[-5spx] w-4 text-center leading-4 bg-green-700
                     text-black rounded-full aspect-square text-[8px]'>{cart?.length}</p>
                            </div>

                            <Menu color="white" onClick={() => setControlMenu(true)} className='w-5 md:hidden' />
                        </div>
                        {controlMenu && (
                            <div className={`absolute md:hidden h-full min-h-[calc(100vh)] top-0 z-50 right-0 bottom-0 bg-white overflow-hidden transition-all  ${controlMenu ? 'w-full' : 'w-0'} `}>

                                <div className='flex flex-col h-full text-gray-600'>

                                    <div onClick={() => setControlMenu(false)} className='flex gap-6 items-center w-fit p-2 cursor-pointer hover:text-black'>
                                        <Image src={dropdownIcon} alt='Dropdown' className='h-4 rotate-180' />
                                        <p >Voltar</p>
                                    </div>

                                    <Link onClick={() => setControlMenu(false)} href={'/'} className={'py-2 pl-6 border-b hover:text-green-700'}>HOME</Link>
                                    <Link onClick={() => setControlMenu(false)} href={'/collection'} className={'py-2 pl-6 border-b hover:text-green-700'}>COLEÇÃO</Link>

                                    {categoryMenus.map((menu) => (
                                        <div key={menu.category} className='border-b bg-r'>
                                            <div className='flex items-center justify-between pl-6 pr-4 py-2'>
                                                <Link onClick={() => setControlMenu(false)} href={`/collection?category=${menu.category}`} className='hover:text-black'>
                                                    {menu.label}
                                                </Link>
                                                <Image
                                                    alt='Dropdown'
                                                    onClick={() => setOpenMobileCategory(openMobileCategory === menu.category ? null : menu.category)}
                                                    src={dropdownIcon}
                                                    className={`h-3 cursor-pointer transition-transform ${openMobileCategory === menu.category ? 'rotate-90' : ''}`}
                                                />
                                            </div>

                                            {openMobileCategory === menu.category && (
                                                <div className='flex flex-col bg-gray-0'>
                                                    {menu.subCategories.map((sub) => (
                                                        <Link
                                                            key={sub.value}
                                                            onClick={() => setControlMenu(false)}
                                                            href={`/collection?category=${menu.category}&subCategory=${sub.value}`}
                                                            className='py-2 pl-10 text-gray-500 hover:text-black'
                                                        >
                                                            {sub.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    <Link onClick={() => setControlMenu(false)} href={'/about'} className={'py-2 pl-6 border-b hover:text-green-700'}>SOBRE</Link>
                                    <Link onClick={() => setControlMenu(false)} href={'/contact'} className={'py-2 pl-6 border-b hover:text-green-700'}>CONTATO</Link>

                                </div>


                            </div>
                        )}


                    </div>

                    <div className='flex justify-center p-4'>
                        <ul className='hidden md:flex gap-8 text-sm text-white'>
                            {categoryLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.to} className='uppercase hover:text-green-700 hover:underline underline-offset-4'>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                    </div>

                    <SearchMobile />






                </div>

                {categoryMenus.map((menu) => {
                    const open = activeMenu === menu.category
                    return (
                        <div
                            key={menu.category}
                            className={`hidden md:block absolute left-0 right-0 top-full z-20 bg-white border-t shadow-md transition-all duration-300 ease-out ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                        >
                            <div className='grid grid-cols-5 gap-8 px-2 py-8'>
                                <div className='flex flex-col gap-4'>
                                    <p className='text-xs font-semibold uppercase text-gray-500'>Produtos</p>
                                    {menu.subCategories.map((sub) => (
                                        <Link
                                            key={sub.value}
                                            onClick={() => setActiveMenu(null)}
                                            href={`/collection?category=${menu.category}&subCategory=${sub.value}`}
                                            className='text-base font-semibold text-black hover:text-green-700 hover:underline'
                                        >
                                            {sub.label}
                                        </Link>
                                    ))}
                                    <Link
                                        onClick={() => setActiveMenu(null)}
                                        href={`/collection?category=${menu.category}`}
                                        className='text-base font-semibold text-black hover:text-green-700 hover:underline'
                                    >
                                        Todos
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Navbar