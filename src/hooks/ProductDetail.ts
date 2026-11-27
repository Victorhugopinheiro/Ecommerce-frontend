


import api from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/mongoose.gen";

interface ProductDetailResponse {
    success: boolean;
    message: string;
    product: Product;
}

export  function useProductDetail(productId: string) {
    return useQuery({
        queryKey: ["product", productId],   
        queryFn: async () => {

            
            const response = await api.get<ProductDetailResponse>("/api/products/detail/" + productId);

         
            return response.data.product as Product;
        }
    });
};