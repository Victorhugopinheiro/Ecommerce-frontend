import { Suspense } from "react";
import { ProductContent } from "./_components/content";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <ProductById params={params} />
    </Suspense>
  );
}

async function ProductById({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: productId } = await params;

  console.log("productId", productId);

  return <ProductContent productId={productId} />;
}
