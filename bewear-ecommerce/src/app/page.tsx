import { desc } from "drizzle-orm";
import Image from "next/image";

import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductsList from "@/components/common/products-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable } from "@/db/schema";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
      category: true,
    },
  });
  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
      category: true,
    },
  });
  const categories = await db.query.categoryTable.findMany({});
  return (
    <>
      <Header />
      <div className="space-y-6">
        <div className="px-5">
          <Image
            src="/banner01.png"
            alt="Leve uma vida com estilo"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
        <h3 className="font-semibold px-6">Marcas parceiras</h3>
        <div className="flex w-full gap-6 overflow-x-auto px-6">
          <div className="px-4 flex flex-col items-center">
            <Image src="/icon-adidas.png" alt="Adidas" width={80} height={80} />
            <p className="text-xs font-medium text-center mt-2">Adidas</p>
          </div>

          <div className="px-4 flex flex-col items-center">
            <Image src="/icon-nike.png" alt="Nike" width={80} height={80} />
            <p className="text-xs font-medium text-center mt-2">Nike</p>
          </div>

          <div className="px-4 flex flex-col items-center">
            <Image src="/icon-puma.png" alt="Puma" width={80} height={80} />
            <p className="text-xs font-medium text-center mt-2">Puma</p>
          </div>

          <div className="px-4 flex flex-col items-center">
            <Image
              src="/icon-newbalance.png"
              alt="New Balance"
              width={80}
              height={80}
            />
            <p className="text-xs font-medium text-center mt-2">New Balance</p>
          </div>
        </div>

        <ProductsList products={products} title="Mais vendidos" />
        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>
        <div className="px-5">
          <Image
            src="/banner02.png"
            alt="Leve uma vida com estilo"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
        <ProductsList products={newlyCreatedProducts} title="Novos produtos" />
      </div>
      <Footer />
    </>
  );
};

export default Home;
