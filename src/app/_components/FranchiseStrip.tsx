"use client";

import { useContext } from "react";
import ImgModel from "../../components/imgModel";
import Tittle from "../../components/Tittle";
import { ShopContext } from "../../context/ShopContext";
import type { ShowcaseItem } from "@/hooks/gettingHomeShowcase";
import Image from "next/image";
import banner from "../../../public/chooseYourSideBanner.jpg";

function FranchiseStrip({ title, products }: { title: string; products: ShowcaseItem[] }) {
    const { currency } = useContext(ShopContext)!;

    if (products.length === 0) {
        return null;
    }

    return (
        <div className="my-8">

            <Image src={banner.src} alt={title} width={2000} height={200} className="w-full h-auto object-contain" />
            <div className="flex justify-center items-center flex-col">
                <Tittle title1="" title2={title} />
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
    );
}

export default FranchiseStrip;
