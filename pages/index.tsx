"use client";
import { useEffect } from "react";
import Categories from "../packages/components/Categories";
import ProductGrid from "../packages/components/ProductGrid";
import { contentStore } from "@/packages/store";
import { useSearchParams } from "next/navigation";
import { observer } from "mobx-react";

const Home = observer(() => {
  const searchParams = useSearchParams();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const q: any = {};
    searchParams.forEach((value, key) => {
      q[key] = value;
    });
    contentStore.initFromQuery(q);
    contentStore.loadContents();
  }, [searchParams]);

  return (
    <div className="container mx-auto min-h-screen">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <div
          className="grid py-10 gap-y-10"
          aria-label="Product list and categories"
        >
          <Categories aria-label="Product categories" />
          <ProductGrid aria-label="Product grid" />
        </div>
      </main>
    </div>
  );
});

export default Home;
