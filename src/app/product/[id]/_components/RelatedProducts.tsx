
import { useContext, useEffect, useState } from 'react';
import Tittle from '../../../../components/Tittle';
import { ShopContext } from '../../../../context/ShopContext';
import ImgModel from '../../../../components/imgModel';
import { Product as ProductProps } from '../../../../types/mongoose.gen';

interface RelatedProductsProps {
    category?: string;
    
    productId?: string;
}

export default function RelatedProducts({ category,  productId }: RelatedProductsProps) {


    console.log("productIdddd", productId);
   

    const { fetchedProducts } = useContext(ShopContext)!
    const [relatedProducts, setRelatedProducts] = useState<ProductProps[]>([]);

    const filteredProducts = () => {
        let copyProducts = [...fetchedProducts!];

        if (category) {
            copyProducts = copyProducts.filter(product => product.category === category && product._id !== productId).slice(0, 5);
            return setRelatedProducts(copyProducts)


        } 



    }

    console.log("relatedProducts", relatedProducts);


    useEffect(() => {

        filteredProducts()


    }, [fetchedProducts, category])


    return (
        <div>
            <Tittle title1='Produtos' title2='Relacionados' />


            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                { relatedProducts.length > 0 ? relatedProducts.map((product) => (
                    <ImgModel price={String(product.price ?? product.models?.[0]?.price)} title={product.name} url={product.image?.[0] || product.models?.[0]?.image || ""} currency='R$'
                        id={product._id.toString()} key={product._id.toString()}
                    />
                )) : <p className='text-center text-gray-500'>Nenhum produto relacionado encontrado</p>}
            </div>

        </div>
    )
}
