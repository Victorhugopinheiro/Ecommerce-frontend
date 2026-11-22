import { useQuery } from "@tanstack/react-query";
import api from "@/service/api";
import type { Review } from "@/types/mongoose.gen";

type ReviewsListResponse = {
    success: boolean;
    message?: string;
    reviews: Review[];
};

export function useGettingReviewsHook(productId?: string) {
    return useQuery({
        queryKey: ["getting-reviews", productId ?? "all"],
        queryFn: async () => {
            const response = await api.get<ReviewsListResponse>("/api/reviews/list", {
                params: productId ? { productId } : undefined,
            });

            if (!response.data.success || !Array.isArray(response.data.reviews)) {
                throw new Error("Erro ao carregar avaliações.");
            }

            return response.data.reviews;
        },
    });
}
