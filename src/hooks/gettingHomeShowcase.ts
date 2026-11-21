import { useQuery } from "@tanstack/react-query";
import api from "@/service/api";

export type ShowcaseItem = {
    _id: string;
    name: string;
    price: number;
    image?: string;
};

export type HomeShowcase = {
    bestsellers: ShowcaseItem[];
    gtaVi: ShowcaseItem[];
    marvel: ShowcaseItem[];
    dc: ShowcaseItem[];
};

type HomeShowcaseResponse = {
    success?: boolean;
    bestsellers?: unknown;
    gtaVi?: unknown;
    marvel?: unknown;
    dc?: unknown;
};

function readShowcaseList(value: unknown): ShowcaseItem[] {
    if (!Array.isArray(value)) {
        throw new Error("Resposta da vitrine incompleta.");
    }

    const items: ShowcaseItem[] = [];

    for (const entry of value) {
        if (!entry || typeof entry !== "object") {
            continue;
        }

        const candidate = entry as Partial<ShowcaseItem>;
        if (typeof candidate._id !== "string" || candidate._id.length === 0) {
            continue;
        }
        if (typeof candidate.name !== "string" || candidate.name.length === 0) {
            continue;
        }
        if (typeof candidate.price !== "number" || Number.isNaN(candidate.price)) {
            continue;
        }

        const item: ShowcaseItem = {
            _id: candidate._id,
            name: candidate.name,
            price: candidate.price,
        };

        if (typeof candidate.image === "string" && candidate.image.length > 0) {
            item.image = candidate.image;
        }

        items.push(item);
        if (items.length === 8) {
            break;
        }
    }

    return items;
}

function readShowcase(data: HomeShowcaseResponse): HomeShowcase {
    if (!data.success) {
        throw new Error("Erro ao carregar produtos.");
    }

    return {
        bestsellers: readShowcaseList(data.bestsellers),
        gtaVi: readShowcaseList(data.gtaVi),
        marvel: readShowcaseList(data.marvel),
        dc: readShowcaseList(data.dc),
    };
}

export function useHomeShowcase() {
    return useQuery({
        queryKey: ["home-showcase"],
        queryFn: async () => {
            const response = await api.get<HomeShowcaseResponse>("/api/products/showcase");
            return readShowcase(response.data);
        },
    });
}
