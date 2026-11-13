import { HeartHandshakeIcon, Truck, Undo2 } from "lucide-react"


function SecondNavbar() {
    return (
        <div className="bg-green-700 py-1 flex justify-evenly">
            <div className="flex items-center gap-2">
                <p className="text-center text-sm text-white ">Envio grátis para todo o Brasil!</p>
                <Truck color="white"/>
            </div>

              <div className=" items-center gap-2 hidden md:flex">
                <p className="text-center text-sm text-white ">Trocas e devoluções em até 7 dias!</p>
                <Undo2 color="white"/>
            </div>

              <div className="items-center gap-2 hidden md:flex">
                <p className="text-center text-sm text-white ">Parcele suas compras em até 12x!</p>
                <HeartHandshakeIcon color="white"/>
            </div>
            
        </div>
    )
}

export default SecondNavbar