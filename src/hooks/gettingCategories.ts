import { useQuery } from "@tanstack/react-query";
import type { Categories } from "@/types/mongoose.gen";
import api from "@/service/api";

type CategoriesResponse = {
    success: boolean;
    categories: Categories[];
};

export function useGettingCategoriesHook() {
   return useQuery({
        queryKey: ['getting-categories'],
        queryFn: async () => {
            const response = await api.get<CategoriesResponse>('/api/categories');
            if (!response.data.success) {
                throw new Error("Erro ao carregar categorias.");
            }
            return response.data.categories;
        }
    })
}