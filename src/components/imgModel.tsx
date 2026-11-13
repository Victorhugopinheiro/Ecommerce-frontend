import { Link } from "react-router-dom";


interface ImgModelProps {
    url: string;
    title: string;
    price: string;
    currency?: string;
    id?:string
    oldPrice?: string | number;
    installments?: number;
}

const format = (value: string | number) =>
    Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function ImgModel({ price, title, url, currency, id, oldPrice, installments = 12 }: ImgModelProps) {

    const priceNumber = Number(price);
    const symbol = currency ? `${currency} ` : "R$ ";
    return (
        <Link to={`/product/${id}`} className="flex flex-col items-center justify-between gap-2 bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="overflow-hidden">
                <img className="hover:scale-110 transition ease-in-out" src={url} />
            </div>

            <div className="flex flex-col items-start w-full">
                <h2 className="text-sm pb-1 pt-2 ">{title}</h2>
                <div className="flex justify-evenly  items-baseline gap-2">
                    <p className="text-black text-lg font-semibold">{symbol}{format(price)}</p>
                    {oldPrice !== undefined && Number(oldPrice) >= priceNumber && (
                        <p className="text-gray-400 text-sm line-through">{symbol}{format(oldPrice)}</p>
                    )}
                </div>
                {priceNumber > 0 && (
                    <p className="text-xs text-gray-500">
                        ou <span className="font-semibold">{installments}x</span> de{" "}
                        <span className="font-semibold">{symbol}{format(priceNumber / installments)}</span>
                    </p>
                )}
            </div>

        </Link>
    )
}

export default ImgModel