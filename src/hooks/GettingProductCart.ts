import { useQuery } from "@tanstack/react-query";
import api from "@/service/api";

import type { CartItem } from "@/context/ShopContext";


type ProductCartResponse = {
    success: boolean;
    productCart: CartItem[];
};


export function useGettingProductCartHook() {
    return useQuery({
        queryKey: ['getting-product-cart'],
        queryFn: async () => {
            const response = await api.post<ProductCartResponse>('/api/cart/items');
            if (!response.data.success) {
                throw new Error("Erro ao carregar produto do carrinho.");
            }
            return response.data.productCart;
        }
    })
}