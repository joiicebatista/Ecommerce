import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { Header } from "@/components/common/header";
import ProductItem from "@/components/common/product-item";
import { db } from "@/db";
import { categoryTable, productTable } from "@/db/schema";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;
  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
  });
  if (!category) {
    return notFound();
  }
  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, category.id),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header />
      <h2>{category.name}</h2>
      <div className="grid grid-cols-2 gap-4">
        {products.map((products) => (
          <ProductItem
            key={products.id}
            product={products}
            textContainerClassName="max-w-full"
          />
        ))}
      </div>
    </>
  );
};

export default CategoryPage;
