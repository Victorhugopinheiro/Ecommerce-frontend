"use client";

import { useContext } from "react"
import ImgModel from "../../components/imgModel"
import Tittle from "../../components/Tittle"
import { ShopContext } from "../../context/ShopContext"
import type { ShowcaseItem } from "@/hooks/gettingHomeShowcase"


function LastestsCollections({ products }: { products: ShowcaseItem[] }) {
    const { currency } = useContext(ShopContext)!

    if (products.length === 0) {
        return null
    }

    return (
        <div className="my-8">

            <div className="flex justify-center items-center flex-col ">
                <Tittle title1="MAIS" title2="VENDIDOS" />

                <p className="text-gray-600 max-w-6/12 text-center">                Descubra as novidades da estação, com peças modernas, confortáveis e prontas para
                                    renovar o seu visual.
                                </p>

            </div>



            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
                {products.map((product) => (
                    <ImgModel
                        key={product._id}
                        url={product.image}
                        title={product.name}
                        price={String(product.price)}
                        currency={currency}
                        id={product._id}
                    />
                ))}
            </div>



        </div>
    )
}

export default LastestsCollections
