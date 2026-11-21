import { useMutation } from "@tanstack/react-query";
import api from "@/service/api";
import type { CartItem } from "@/context/ShopContext";
import { toast } from "react-toastify";
import { QueryClient } from "@tanstack/react-query";


type AddProductCartResponse = {
    success: boolean;
    productCart: CartItem[];
};


export function useAddProductCartHook() {

    const queryClient = new QueryClient();
    return useMutation({
        mutationFn: async ({ productId, quantity, size, name }: { productId: string, quantity: number, size: string, name?: string }) => {
            const response = await api.post<AddProductCartResponse>('/api/cart/add', { productId });
            if (!response.data.success) {
                throw new Error("Erro ao adicionar produto ao carrinho.");
            }
            return response.data.productCart;
        },
        onSuccess: (data) => {
            toast.success("Produto adicionado ao carrinho!");
            queryClient.invalidateQueries({ queryKey: ['getting-product-cart'] });
        },
        onError: (error) => {
            toast.error("Erro ao adicionar produto ao carrinho.");
            queryClient.invalidateQueries({ queryKey: ['getting-product-cart'] });
        }
    })
}