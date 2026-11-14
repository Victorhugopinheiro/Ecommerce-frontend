import Image from "next/image"
import { assets } from "../../../public/assets"


function GarantedServices() {
    return (
        <div className="flex flex-col gap-6 md:flex-row justify-around items-center my-16 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-1">
                <Image src={assets.exchange_icon} alt="Fast Delivery" className="w-16 h-16" />
                <p className="text-gray-900">Facil Política de troca </p>
                <p className="text-gray-500 text-sm ">Nós facilitamos a troca de produto</p>

            </div>



            <div className="flex flex-col items-center gap-1">
                <Image src={assets.quality_icon} alt="Fast Delivery" className="w-16 h-16" />
                <p className="text-gray-700">7 Dias para devolução  </p>
                <p className="text-gray-500 text-sm">Nós oferecemos 7 dias para devolução</p>

            </div>

            <div className="flex flex-col items-center gap-1">
                <Image src={assets.support_img} alt="Fast Delivery" className="w-16 h-16" />
                <p className="text-gray-700">O melhor suporte para clientes  </p>
                <p className="text-gray-500 text-sm">Suporte 24/7 para nossos clientes</p>

            </div>
        </div>
    )
}

export default GarantedServices