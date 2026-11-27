"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../service/api";
import { AuthContext } from "./authContext";
import axios from "axios";
import { useGettingProductCartHook } from "@/hooks/GettingProductCart";
import { useAddProductCartHook } from "@/hooks/AddProductCart";
import { useGettingProductsHook } from "@/hooks/gettingProducts";
import { Product } from "@/types/mongoose.gen";

export interface CartItem {
    productId: string;
    size: string;
    quantity: number;
    name?: string;
    price?: number;
}

interface ShopContextType {
    currency: string;
    setCurrency: (currency: string) => void;

    fee: string;
    setFee: (fee: string) => void;

    feeId: string;
    setFeeId: (feeId: string) => void;

    search?: string;
    setSearch?: (search: string) => void;

    showSearch?: boolean;
    setShowSearch?: (show: boolean) => void;

    cart?: CartItem[];
    setCart?: (cart: CartItem[]) => void;

    addToCart?: (item: CartItem) => void;

    removeProduct?: (productId: string, size: string) => void;
    totalItems?: () => number;

    totalValue?: number;
    setTotalValue?: (total: number) => void;

    cartToggle: boolean;
    setCartToggle: (toggle: boolean) => void;

    fetchedProducts?: Product[];
}

function sumCartTotal(items: CartItem[]): number {
    return items.reduce((total, item) => {
        if (typeof item.price !== "number" || Number.isNaN(item.price)) {
            return total;
        }
        if (typeof item.quantity !== "number" || item.quantity < 1) {
            return total;
        }
        return total + item.price * item.quantity;
    }, 0);
}

export const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
    const { authenticated } = useContext(AuthContext)!;

    const { data: fetchedProductCart, refetch: refetchProductCart } = useGettingProductCartHook(authenticated);

    const { mutate: addToCartMutation } = useAddProductCartHook();

    const { data: fetchedProducts } = useGettingProductsHook();

    const [currency, setCurrency] = useState<string>("R$");
    const [fee, setFee] = useState<string>("0");
    const [feeId, setFeeId] = useState<string>("");
    const [cartToggle, setCartToggle] = useState<boolean>(false);

    const [search, setSearch] = useState<string>("");
    const [showSearch, setShowSearch] = useState<boolean>(true);

    const [totalValue, setTotalValue] = useState<number>(0)
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = async (item: CartItem) => {
        if (!item.size) {
            toast.error("Por favor, selecione um tamanho válido.");
            return
        }

        if (!authenticated) {
            toast.error("Você precisa estar logado para adicionar ao carrinho.");
            return;
        }


        try {
            void addToCartMutation({ productId: item.productId, quantity: item.quantity, size: item.size, name: item.name });

        } catch (error) {
            toast.error("Erro ao adicionar produto ao carrinho.");
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                ;
            }
        }
    }

    const removeProduct = async (productId: string, size: string) => {
        if (!authenticated) return;

        try {
            const response = await api.delete('/api/cart/remove', {
                data: { productId, size },

            });

            if (response.data.success) {
                await refetchProductCart();
                toast.success("Produto removido do carrinho!")
            } else {
                toast.error("Erro ao remover produto do carrinho!")

            }
        } catch (error) {
            toast.error("Erro ao remover produto.");
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                ;
            }
        }
    }

    const totalItems = () => {
        const total = sumCartTotal(cart);
        setTotalValue(total);
        return total;
    }

    useEffect(() => {
        if (!authenticated) {
            setCart([]);
            return;
        }

        if (fetchedProductCart) {
            setCart(fetchedProductCart);
        }
    }, [authenticated, fetchedProductCart]);

    useEffect(() => {
        const raw = localStorage.getItem("selectedShipping");
        if (!raw) return;

        try {
            const shipping = JSON.parse(raw) as { price?: string | number; id?: string };
            if (shipping.price != null) setFee(String(shipping.price));
            if (shipping.id != null) setFeeId(String(shipping.id));
        } catch {
            // Frete salvo inválido: mantém os valores iniciais.
        }
    }, []);

    useEffect(() => {
        setTotalValue(sumCartTotal(cart));
    }, [cart]);

    return (
        <ShopContext.Provider value={{
            currency, setCurrency,
            fee, setFee,
            search, setSearch, setShowSearch, showSearch,
            cart, setCart, addToCart, removeProduct, totalItems, setTotalValue, totalValue,
            feeId, setFeeId, cartToggle, setCartToggle, fetchedProducts
        }}>
            {children}
        </ShopContext.Provider>
    );
};
