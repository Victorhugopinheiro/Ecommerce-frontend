"use client";

import { useContext } from "react"
import ImgModel from "../../components/imgModel"
import Tittle from "../../components/Tittle"
import { ShopContext } from "../../context/ShopContext"
import StackedTitle from "../../components/StackedTitle"
import { Product } from "@/types/mongoose.gen";

interface Brand {
    title: string;
    subtitle: string;
    banner: string;
    description: string;
    products: Product[];
}

function BrandsColletions({ brand }: { brand: Brand }) {


    const { currency } = useContext(ShopContext)!
    

    return (
        <div className="my-8">

            <div className="flex justify-center items-center flex-col ">
                <Tittle title1={brand.title} title2={brand.subtitle} />

                <p className="text-gray-600 max-w-6/12 text-center">
                    {brand.description}
                </p>

            </div>



            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
                {brand.products.map((product) => (
                    <ImgModel
                        key={product._id}
                        url={product.image[0]}
                        title={product.name}
                        price={String(product.price)}
                        currency={currency}
                        id={product._id}
                        oldPrice={String(product.price)}
                    />
                ))}
            </div>



        </div>
    )
}

export default BrandsColletions