"use client";



import { useContext, useEffect, useState } from "react";

import {
  CreditCard,
  Minus,
  Package2,
  Plus,
  Ruler,
  ShoppingCart,
  ShieldCheck,
  Star,
  Truck,
  RefreshCcw,
} from "lucide-react";


import quality_icon from "../../../../../public/quality_icon.png";
import profile_icon from "../../../../../public/profile_icon.png";
import { ShopContext } from "../../../../context/ShopContext";
import RelatedProducts from "./RelatedProducts";

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import { useProductDetail } from "@/hooks/ProductDetail";
import { useGettingReviewsHook } from "@/hooks/gettingReviews";
import { Button } from "@/components/ui/button";

function formatReviewDate(timestamp?: number) {
  if (timestamp == null || !Number.isFinite(timestamp)) {
    return "";
  }

  const milliseconds = timestamp < 1_000_000_000_000 ? timestamp * 1000 : timestamp;
  const date = new Date(milliseconds);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("pt-BR").format(date);
}

type ProductContentProps = {
  productId: string;
};

function getGalleryImages(product?: {
  image?: unknown[];
  models?: { image?: string }[];
}): string[] {
  if (!product) {
    return [];
  }

  const showcaseImages = (product.image ?? []).filter(
    (image): image is string => typeof image === "string" && image.length > 0,
  );
  const modelImages = (product.models ?? [])
    .map((model) => model.image)
    .filter((image): image is string => Boolean(image));

  return [...new Set([...showcaseImages, ...modelImages])];
}

export function ProductContent({ productId }: ProductContentProps) {
  



  const { data: product, isLoading: isLoadingProductDetail, isError: isErrorProductDetail } = useProductDetail(productId);
  const { data: reviews = [], isLoading: isLoadingReviews } = useGettingReviewsHook(productId);



  const formatPrice = (price: number) => {

    //console.log("price", price);



    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price).replace(".", ",");
  };



  const [selectedModel, setSelectedModel] = useState<any>(product?.models?.[0] || "");

  const { fetchedProducts, addToCart, currency } = useContext(ShopContext)!;


  const [selectedImage, setSelectedImage] = useState("");
  const [sizeSelected, setSizeSelected] = useState("")
  const [quantity, setQuantity] = useState(1)

  const galleryImages = getGalleryImages(product);
  const mainImage = selectedImage || galleryImages[0] || "";


  const price = product?.price ?? product?.models?.[0]?.price ?? 0;
  const [selectedProductPrice, setSelectedProductPrice] = useState<number>();
  const sellingPrice = selectedProductPrice ?? price;
  const originalPrice = Number((sellingPrice * 1.25).toFixed(2));
  const discountPercent =
    originalPrice > 0 ? Math.round((1 - sellingPrice / originalPrice) * 100) : 0;
 

  useEffect(() => {
    if (!product) {
      return;
    }

    setSelectedImage(getGalleryImages(product)[0] || "");
    setSizeSelected("");
    setQuantity(1);
  }, [product]);

  if (!product) {
    return <div className="text-center ">Produto não encontrado</div>;
  }




  function handleSelectedModel(model: any) {
    setSelectedModel(model);
    setSelectedImage(model.image);
    setSelectedProductPrice(model.price ?? price);
  }


  return (
    <div className="p-1">
      <main data-product-id={productId} />
      <div className="flex flex-col container mx-auto border-t-2 border-gray-200">
        <div className="flex flex-col gap-10 py-10 lg:flex-row">
          <div className="flex min-w-0 flex-1 flex-col gap-3 lg:flex-row lg:items-start">
            <div className="order-2 flex gap-2 overflow-x-auto lg:order-1 lg:max-h-[640px] lg:w-24 lg:shrink-0 lg:flex-col lg:overflow-y-auto">
              {galleryImages.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  onClick={() => setSelectedImage(image)}
                  aria-label={`Ver foto ${index + 1} de ${product.name}`}
                  aria-pressed={selectedImage === image}
                  className={`relative size-16 shrink-0 overflow-hidden rounded-lg border transition-colors lg:size-24 ${selectedImage === image ? "border-black" : "border-gray-200 hover:border-gray-400"}`}
                >
                  <Image
                    fill
                    src={image}
                    alt=""
                    sizes="(max-width: 1023px) 64px, 96px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="relative order-1 aspect-square w-full overflow-hidden bg-neutral-50 lg:order-2 lg:max-w-[640px]">
              {mainImage ? (
                <Image
                  key={mainImage}
                  fill
                  src={mainImage}
                  alt={product.name}
                  sizes="(max-width: 1023px) 100vw, (max-width: 1600px) 40vw, 640px"
                  className="object-contain"
                  {...(mainImage === galleryImages[0]
                    ? { preload: true }
                    : { loading: "eager" as const })}
                />
              ) : null}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-6 md:ml-10">
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold text-gray-900 md:text-4xl">{product.name}</h1>

              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-4 fill-current" />
                  ))}
                </div>
                <span className="text-gray-900">({reviews.length})</span>
                <span>•</span>
                <span>Frete calculado no checkout</span>
              </div>
            </div>

            <div className="flex flex-wrap items-end gap-3">
              <p className="text-3xl font-bold text-gray-900">{formatPrice(sellingPrice)}</p>
              <p className="text-lg text-gray-400 line-through">{formatPrice(originalPrice)}</p>
              <span className="rounded-lg bg-black px-3 py-2 text-sm font-semibold text-white">
                {discountPercent}% OFF
              </span>
            </div>



            {product.models && (
              <div className="flex flex-wrap gap-1">
                {product.models?.map((model, index) => (
                  <Button onClick={() => handleSelectedModel(model)} key={index} variant="outline" className={`flex  text-sm font-medium uppercase tracking-wide w-fit border rounded-md border-b-gray-100  p-2 ${selectedModel === model ? "border-black bg-black text-white" : "border-gray-300 bg-white text-gray-900 hover:border-gray-500"}`}>
                    <p className={` flex  text-sm font-medium uppercase tracking-wide w-fit    p-2 ${selectedModel === model ? "text-white" : "text-gray-900"}`}> {model.name}</p>
                  </Button>
                ))}
              </div>
            )}

            <div className="h-px w-full bg-gray-200" />

            <div className="space-y-3">
              <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Tamanho</p>
              <div className="flex flex-wrap gap-3">
                {product.sizes?.map((size, index) => (
                  <button
                    type="button"
                    onClick={() => setSizeSelected(size)}
                    key={index}
                    className={`min-w-28 rounded-2xl border px-6 py-3 text-base transition-colors ${sizeSelected === size
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white text-gray-900 hover:border-gray-500"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <Ruler className="size-5 text-gray-700" />
                  <p className="text-sm font-medium text-gray-900">Tabela de Medidas</p>
                </div>
                <button type="button" className="text-sm text-gray-500 underline underline-offset-4">
                  Ver tabela
                </button>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex items-center rounded-2xl border border-gray-300">
                  <button
                    type="button"
                    onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                    className="px-4 py-4 text-gray-600 transition-colors hover:bg-gray-100"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="min-w-12 px-4 text-center text-base font-medium text-gray-900">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((current) => current + 1)}
                    className="px-4 py-4 text-gray-600 transition-colors hover:bg-gray-100"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    if (addToCart) {
                      addToCart({ productId: product._id, quantity, size: sizeSelected, name: product.name })
                    }
                  }}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-green-700"
                >
                  <ShoppingCart className="size-5" />
                  Adicionar ao carrinho
                </button>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-4">
                <Truck className="size-5 shrink-0 text-green-700" />
                <p className="text-sm font-semibold text-gray-900">
                  FRETE GRÁTIS <span className="font-normal text-gray-600">a partir de R$ 199</span>
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-4">
                  <Package2 className="size-5 shrink-0 text-gray-700" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Categoria</p>
                    <p className="text-sm font-semibold text-gray-900">{product.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-4">
                  <ShieldCheck className="size-5 shrink-0 text-gray-700" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Garantia</p>
                    <p className="text-sm font-semibold text-gray-900">Troca fácil em até 7 dias</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 sm:grid-cols-3">
                <div className="flex flex-col items-center gap-2 bg-white px-4 py-5 text-center">
                  <RefreshCcw className="size-5 text-gray-700" />
                  <p className="text-sm text-gray-500">1ª troca grátis</p>
                  <p className="text-sm font-semibold text-gray-900">Em até 7 dias</p>
                </div>

                <div className="flex flex-col items-center gap-2 bg-white px-4 py-5 text-center">
                  <CreditCard className="size-5 text-gray-700" />
                  <p className="text-sm text-gray-500">Desconto extra</p>
                  <p className="text-sm font-semibold text-gray-900">No PIX</p>
                </div>

                <div className="flex flex-col items-center gap-2 bg-white px-4 py-5 text-center">
                  <ShoppingCart className="size-5 text-gray-700" />
                  <p className="text-sm text-gray-500">Parcele em até</p>
                  <p className="text-sm font-semibold text-gray-900">3x sem juros</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
              <Image className="size-5" src={quality_icon.src} alt="" width={20} height={20} />
              <p>Produto 100% original com acabamento de qualidade.</p>
            </div>
          </div>
        </div>

        <div className="mb-10 relative ">
          {isLoadingReviews ? (
            <p className="px-4 py-8 text-center text-sm text-gray-500">Carregando avaliações...</p>
          ) : reviews.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-gray-500">Ainda não há avaliações para este produto.</p>
          ) : (
            <Carousel
              opts={{
                align: "start",
              }}
              className="relative max-w-full px-8 md:px-12"
            >


              <CarouselContent className="-ml-5">
                {reviews.map((review) => {
                  const reviewDate = formatReviewDate(review.date) || formatReviewDate(
                    review.createdAt ? Date.parse(review.createdAt) : undefined,
                  );
                  const avatar = review.userImage || profile_icon.src;

                  return (
                    <CarouselItem key={review._id} className="basis-full pl-5 md:basis-1/2">
                      <Card
                        size="sm"
                        className="h-full gap-0 overflow-hidden rounded-2xl border border-gray-200 bg-white py-0 shadow-[0_1px_8px_rgba(0,0,0,0.06)] ring-0"
                      >
                        <CardContent className="flex h-full min-h-80 flex-col p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-0.5 text-black">
                              {Array.from({ length: 5 }).map((_, index) => (
                                <Star key={index} className="size-4 fill-current" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-400">{reviewDate}</span>
                          </div>

                          <div className="mt-2 flex items-center gap-2">
                            <div className="relative flex size-10 items-center justify-center overflow-hidden rounded-lg bg-gray-100 text-gray-700">
                              <Image className="size-7 object-cover" src={avatar} alt="" width={28} height={28} />
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-base font-medium text-gray-900">{review.userName}</p>
                              <span className="rounded-full bg-black px-2 py-0.5 text-xs font-semibold text-white">
                                Verificado
                              </span>
                            </div>
                          </div>

                          {review.platform ? (
                            <p className="mt-1 ml-12 text-sm text-gray-500">{review.platform}</p>
                          ) : null}

                          <p className="mt-4 text-base leading-7 text-gray-600">{review.message}</p>

                          {review.mediaUrl && review.mediaType === "image" ? (
                            <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-xl">
                              <Image
                                fill
                                src={review.mediaUrl}
                                alt={`Mídia enviada por ${review.userName}`}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                              />
                            </div>
                          ) : null}
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              <CarouselPrevious
                variant="default"
                className="border-0 left-0 absolute bg-transparent text-gray-400 shadow-none hover:bg-transparent hover:text-gray-700"
                aria-label="Ver avaliações anteriores"
              />

              <CarouselNext
                variant="default"
                className=" bg-transparent right-0 absolute text-gray-400 shadow-none hover:bg-transparent hover:text-gray-700"
                aria-label="Ver próximas avaliações"
              />
            </Carousel>
          )}

          

        </div>

        <RelatedProducts category={product.category} productId={productId} />

      </div>
    </div>
  );
}
