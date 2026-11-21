import { useQuery } from "@tanstack/react-query";
import api from "@/service/api";

import type { CartItem } from "@/context/ShopContext";


type ProductCartResponse = {
    success: boolean;
    cart: CartItem[];
};


export function useGettingProductCartHook(enabled: boolean) {
    return useQuery({
        queryKey: ['getting-product-cart'],
        enabled,
        queryFn: async () => {
            const response = await api.post<ProductCartResponse>('/api/cart/items');
            if (!response.data.success || !Array.isArray(response.data.cart)) {
                throw new Error("Erro ao carregar produto do carrinho.");
            }
            return response.data.cart;
        }
    })
}
