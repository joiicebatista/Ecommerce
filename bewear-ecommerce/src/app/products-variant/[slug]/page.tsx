import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import ProductAction from "../components/product-action";
import VariantSelector from "../components/variant-selector";

interface ProductsVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductsVariantPage = async ({ params }: ProductsVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });
  if (!productVariant) {
    return notFound();
  }
  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header />
      <div className="flex flex-col space-y-6">
        <div className="relative h-[300px] w-full rounded-3xl">
          <Image
            src={productVariant.imageUrl}
            alt={productVariant.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="px-5">
          <h2 className="font-semibold text-lg">
            {productVariant.product.name}
          </h2>
          <h3 className="text-sm text-muted-foreground">
            {productVariant.name}
          </h3>
          <h2 className="text-lg font-semibold">
            {formatCentsToBRL(productVariant.priceInCents)}
          </h2>
        </div>
        <div className="px-5">
          <VariantSelector
            selectedVariantSlug={productVariant.slug}
            variants={productVariant.product.variants}
          />
        </div>
        <ProductAction productVariantId={productVariant.id} />
        <Footer />
      </div>
    </>
  );
};

export default ProductsVariantPage;
