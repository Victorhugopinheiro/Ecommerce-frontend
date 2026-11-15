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
import gtaCamiseta from "../../../public/gtaImageShirt.jpg";
import gtaLuminaria from "../../../public/luminariaImagemGta.jpg";
import gtaActionFigures from "../../../public/imagemActionFigure.jpg";
import gtaCaneca from "../../../public/imageCanecaGta.jpg";
import gtaCapinha from "../../../public/imagemCapinhaGta.jpg";
import gtaChaveiro from "../../../public/imagemChaveiroGta.jpg";



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

const categories2 = [
    { name: "Roupas e Acessórios", image: gtaCamiseta },
    { name: "Luminárias", image: gtaLuminaria },
    { name: "Action Figures", image: gtaActionFigures },
    { name: "Canecas", image: gtaCaneca },
    { name: "Capinhas e AirPods", image: gtaCapinha },
    { name: "Chaveiro", image: gtaChaveiro },
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
                {categories2.map((category) => (
                    <Link
                        key={category.name}
                        href={`/collection/${encodeURIComponent(category.name)}`}
                        className="group flex flex-col items-center gap-4 shrink-0 w-48 text-center"
                    >
                        <div className="relative w-48 h-48">
                           

                            <img
                                src={category.image.src}
                                alt={category.name}
                                className="absolute   w-full inset-0 m-auto max-w-[85%] max-h-[110%] object-contain transition-transform duration-300 group-hover:scale-110"
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
