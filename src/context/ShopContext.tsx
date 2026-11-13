
"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import api from "../service/api";
import { AuthContext } from "./authContext";
import axios from "axios";

export interface ProductProps {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string[]; // array de caminhos de imagem
    category: string;
    subCategory: string;
    sizes: string[];
    date: number;
    bestseller: boolean;


}

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

    products?: ProductProps[];

    latesteProducts?: ProductProps[];
    setLatestProducts: (currency: ProductProps[]) => void;

    bestSallers?: ProductProps[];
    setBestSallers?: (currency: ProductProps[]) => void;

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

}

export const ShopContext = createContext<ShopContextType | undefined>(undefined);

// ...existing code...

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
    const {  authenticated } = useContext(AuthContext)!;

    const [currency, setCurrency] = useState<string>("R$");
    const [fee, setFee] = useState<string>("0");
    const [feeId, setFeeId] = useState<string>("");
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [cartToggle, setCartToggle] = useState<boolean>(false);

    const [latesteProducts, setLatestProducts] = useState<ProductProps[]>([]);
    const [bestSallers, setBestSallers] = useState<ProductProps[]>([]);

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
            const response = await api.post('/api/cart/add', {
                productId: item.productId,
                quantity: item.quantity,
                size: item.size,
                name: item.name
            });

            if (response.data.success) {
                setCart(response.data.cart);
                toast.success("Produto adicionado ao carrinho!");
            }
        } catch (error: any) {
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

    const gettinProducts = async () => {
        try {
            const response = await api.get('/api/products/list');

            if (response.data.success) {
                setProducts(response.data.products);
                setLatestProducts(response.data.products.slice(0, 10));
                setBestSallers(response.data.products.filter((product: ProductProps) => product.bestseller).slice(0, 5));
            }
        } catch (error) {
            toast.error("Erro ao carregar produtos.");

        }
    }

    const getProductsCart = async () => {
        // Verificações mais rigorosas
        if (!authenticated) {
            return;
        }

        try {


            const response = await api.post('/api/cart/items', {}, {

            });

            if (response.data.success) {
                setCart(response.data.cart || []);

            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {


                if (error.response?.status === 401) {
                   ;
                }
            }
        }
    };

    // Carrega produtos uma vez ao inicializar
    useEffect(() => {
        gettinProducts();
    }, []);

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
        }}>
            {children}
        </ShopContext.Provider>
    );  
};
// ...existing code...