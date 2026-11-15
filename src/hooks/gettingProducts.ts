import { useQuery } from "@tanstack/react-query";
import api from "@/service/api";
import type { Product } from "@/types/mongoose.gen";

type ProductsListResponse = {
    success: boolean;
    products: Product[];
};

export function useGettingProductsHook() {
    return useQuery({
        queryKey: ["getting-products"],
        queryFn: async () => {
            console.log( "Heloooo")
            const response = await api.get<ProductsListResponse>("/api/products/list");

            

            return response.data.products;
        },
    });
}
