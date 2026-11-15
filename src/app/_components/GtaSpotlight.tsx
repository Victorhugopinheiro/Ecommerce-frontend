"use client";

import { CardSimIcon } from "lucide-react";
import StackedTitle from "../../components/StackedTitle";
import LastestsCollections from "./LatestCollections";
import { ShopContext } from "@/context/ShopContext";
import { useContext } from "react";
import Image from "next/image";
import imgModel from "../../components/imgModel";
import ImgModel from "../../components/imgModel";

const models = [
  {
    icon: <CardSimIcon />,
    title: "Frete Grátis",
    description: "A partir de R$99"
  },
  {
    icon: <CardSimIcon />,
    title: "Frete Grátis",
    description: "A partir de R$99"
  },
  {
    icon: <CardSimIcon />,
    title: "Frete Grátis",
    description: "A partir de R$99"
  }
]

export default function GtaSpotlight() {
  const { gtaProducts } = useContext(ShopContext)!;
  return (
    <section className="w-full bg-[#070b16] py-14 [background-image:radial-gradient(ellipse_60%_100%_at_50%_50%,#2a3f66_0%,#070b16_70%)] md:py-16">
      <div className="container mx-auto flex justify-center border-2 w-fit p-2 my-2">
        <p className="text-white text-md font-bold">BLACK NOVEMBER</p>
      </div>

      <div className="flex flex-col my-10 items-center justify-center">
        <p className="text-blue-400 text-md font-bold">// Missão Liberada</p>
        <div className="container mx-auto flex justify-center">
          <StackedTitle bare title="ESPECIAL" highlight="GTA VI" />
        </div>

        <p className="text-gray-400 text-md font-bold">Acesso os descontos esclusivos GTA VI, Estoque limitado.</p>
      </div>


      <div className="flex flex-row gap-4 justify-center items-center">
        {models.map((model, index) => (
          <div className="flex  items-center gap-4 justify-center bg-gray-800 py-1 px-2 rounded-lg border border-gray-600" key={index}>
            <div className="text-white text-2xl">{model.icon}</div>
            <div className="flex flex-col items-start justify-center">
              <p className="text-white text-md font-bold">{model.title}</p>
              <p className="text-gray-400 text-sm">{model.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center">
        {gtaProducts?.map((product, index) => (
          <ImgModel key={index} title={product.name} price={product.price.toString()} url={product.image[0]} id={product._id} />
        ))}
      </div>
    </section>
  );
}
