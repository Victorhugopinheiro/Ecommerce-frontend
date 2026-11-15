
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "@/types/mongoose.gen";
import { toast } from "react-toastify";
import api from "../service/api";
import { AuthContext } from "./authContext";
import axios from "axios";
import { useGettingProductsHook } from "@/hooks/gettingProducts";
import { useGettingProductCartHook } from "@/hooks/GettingProductCart";
import { useAddProductCartHook } from "@/hooks/AddProductCart";

export interface CartItem {
    productId: string;      // id do produto
    size: string;           // tamanho selecionado
    quantity: number;       // quantidade do produto
    name?: string;          // nome do produto (opcional, pode ser buscado via productId)
}

interface ShopContextType {
    currency: string;
    setCurrency: (currency: string) => void;

    fee: string;
    setFee: (fee: string) => void;

    feeId: string;
    setFeeId: (feeId: string) => void;

    products?: Product[];

    latesteProducts?: Product[];
    setLatestProducts: (currency: Product[]) => void;

    bestSallers?: Product[];
    setBestSallers?: (currency: Product[]) => void;

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

    gettinProducts?: () => void;

    cartToggle: boolean;
    setCartToggle: (toggle: boolean) => void;

    gtaProducts?: Product[];
    setGtaProducts: (gtaProducts: Product[]) => void;

}

export const ShopContext = createContext<ShopContextType | undefined>(undefined);

// ...existing code...

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
    const { authenticated } = useContext(AuthContext)!;

    const { data: fetchedProducts, isError, refetch } = useGettingProductsHook();

    const { data: fetchedProductCart, isError: isErrorProductCart, refetch: refetchProductCart } = useGettingProductCartHook();

    const { mutate: addToCartMutation, isPending: isPendingAddToCart } = useAddProductCartHook();

    const [currency, setCurrency] = useState<string>("R$");
    const [fee, setFee] = useState<string>("0");
    const [feeId, setFeeId] = useState<string>("");
    const [products, setProducts] = useState<Product[]>([]);
    const [cartToggle, setCartToggle] = useState<boolean>(false);

    const [latesteProducts, setLatestProducts] = useState<Product[]>([]);
    const [bestSallers, setBestSallers] = useState<Product[]>([]);

    const [search, setSearch] = useState<string>("");
    const [showSearch, setShowSearch] = useState<boolean>(true);

    const [totalValue, setTotalValue] = useState<number>(0)
    const [cart, setCart] = useState<CartItem[]>([]);

    const [gtaProducts, setGtaProducts] = useState<Product[]>([]);

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
                setCart(response.data.cart);
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
        let total = 0;
        cart?.forEach((item: CartItem) => {
            const product = products?.find(product => product._id === item.productId);
            if (product) {
                total += product.price * item.quantity;
            }
        });
        setTotalValue(total);
        return total;
    }

    const gettinProducts = () => {
        void refetch();
    };

    const getProductsCart = async () => {
        if (!authenticated) return;
        void refetchProductCart();
    }


    useEffect(() => {
        if (!fetchedProducts) return;

        setProducts(fetchedProducts);
        setCart(fetchedProductCart || []);
        setLatestProducts(fetchedProducts.slice(0, 10));
        setBestSallers(
            fetchedProducts.filter((product) => product.bestseller).slice(0, 5),
        );
        setGtaProducts(fetchedProducts.filter((product) => product.category === "GTAIV").slice(0, 5));

       
    }, [fetchedProducts, fetchedProductCart]);

    useEffect(() => {
        if (isError) {
            toast.error("Erro ao carregar produtos.");
        }
    }, [isError]);

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
        if (authenticated) {
            const timeoutId = setTimeout(() => {
                getProductsCart();
            }, 100);

            return () => clearTimeout(timeoutId);
        }
    }, [authenticated]);

    // Recalcula total quando cart ou products mudam
    useEffect(() => {
        if (cart.length > 0 && products.length > 0) {
            totalItems();
        }
    }, [cart, products]);

    return (
        <ShopContext.Provider value={{
            currency, setCurrency,
            fee, setFee, products,
            latesteProducts, setLatestProducts,
            bestSallers, setBestSallers,
            search, setSearch, setShowSearch, showSearch,
            cart, setCart, addToCart, removeProduct, totalItems, setTotalValue, totalValue,
            gettinProducts, feeId, setFeeId, cartToggle, setCartToggle,
            gtaProducts, setGtaProducts,
        }}>
            {children}
        </ShopContext.Provider>
    );
};
// ...existing code...