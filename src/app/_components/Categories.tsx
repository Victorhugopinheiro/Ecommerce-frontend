import Link from "next/link";
import { ArrowRight } from "lucide-react";
import img1 from "../../../public/p_img1.png";
import img2 from "../../../public/p_img2.png";
import img3 from "../../../public/p_img3.png";
import img4 from "../../../public/p_img4.png";
import img5 from "../../../public/p_img5.png";
import img6 from "../../../public/p_img6.png";
import img7 from "../../../public/p_img7.png";
import img8 from "../../../public/p_img8.png";

const categories = [
    { name: "Roupas e Acessórios", image: img1 },
    { name: "Luminárias", image: img2 },
    { name: "Pelúcia", image: img3 },
    { name: "Chaveiro", image: img4 },
    { name: "Action Figures", image: img5 },
    { name: "Canecas", image: img6 },
    { name: "Capinhas e AirPods", image: img7 },
    { name: "Cosplays e Fantasias", image: img8 },
];



export default function Categories() {
    return (
        <section className="container mx-auto py-8 px-4">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold text-slate-500">Categorias</h2>
                <Link href="/collection" className="text-sm text-green-900 hover:underline">
                    Ver Todos
                </Link>
            </div>

            <div className="flex flex-wrap gap-6 overflow-x-auto pb-2 lg:justify-between">
                {categories.map((category) => (
                    <Link
                        key={category.name}
                        href={`/collection/${encodeURIComponent(category.name)}`}
                        className="group flex flex-col items-center gap-4 shrink-0 w-32 text-center"
                    >
                        <div className="relative w-28 h-28">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-100 to-green-800" />

                            <img
                                src={category.image.src}
                                alt={category.name}
                                className="absolute rounded-full  w-full inset-0 m-auto max-w-[85%] max-h-[110%] object-contain transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                        <span className="text-sm text-gray-500 group-hover:text-green-900 transition-colors flex flex-col items-center">
                            {category.name}
                            <ArrowRight className="w-4 h-4 hidden group-hover:block" />
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
