"use client";

import { PricingOption, type ContentItem } from "../types";
import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { contentStore } from "../store";
import { observer } from "mobx-react";

const SKELETON_COUNT = 8;

const ProductGrid: FC = observer(() => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const products: ContentItem[] = contentStore.visibleContents;
  const isInitialLoading = contentStore.loading;
  const hasMore =
    contentStore.visibleCount < contentStore.filteredContents.length;

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !loadingMore &&
            !isInitialLoading &&
            hasMore
          ) {
            setLoadingMore(true);
            setTimeout(() => {
              contentStore.increaseVisibleCount();
              setLoadingMore(false);
            }, 800);
          }
        });
      },
      { root: null, rootMargin: "200px", threshold: 0.1 }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [loadingMore, isInitialLoading, hasMore]);

  const skeletons = Array.from({ length: SKELETON_COUNT });

  const isEmpty = !isInitialLoading && products.length === 0;

  return (
    <div className="flex flex-col w-full">
      {isEmpty && (
        <p className="text-center mt-10 text-gray-500 text-lg">
          No products found
        </p>
      )}

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <div
            key={product.id}
            data-cy="product-card"
            className="group product-card grid h-fit content-between duration-300 rounded"
            aria-label={`View details for ${product.title}, price $${(
              product.price || 0
            ).toFixed(2)}`}
          >
            <div className="aspect-square relative w-full truncate overflow-hidden rounded group-hover:rounded-b-none flex items-center justify-center">
              <Image
                fill
                src={product.imagePath || "https://via.placeholder.com/300"}
                alt={product.title}
                className="w-full object-cover group-hover:scale-110 rounded group-hover:rounded-b-none duration-300 group-hover:opacity-75"
              />
            </div>
            <div className="flex py-2 items-start justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm text-gray-300">{product.title}</h3>
                <h3 className="text-sm text-gray-500">{product.creator}</h3>
              </div>
              <p className="px-1 product-price text-xl font-medium text-gray-200">
                {product.pricingOption === PricingOption.PAID
                  ? `$${(product.price || 0).toFixed(2)}`
                  : product.pricingOption === PricingOption.VIEW_ONLY
                  ? "View Only"
                  : "FREE"}
              </p>
            </div>
          </div>
        ))}

        {(isInitialLoading || loadingMore) &&
          skeletons.map((_, idx) => (
            <div
              key={`skeleton-${idx}`}
              className="animate-pulse rounded w-full"
            >
              <div className="aspect-square bg-gray-700 rounded-t" />
              <div className="py-2 flex w-full items-start justify-between">
                <div className="flex w-full flex-col gap-1">
                  <div className="h-4 bg-gray-950 rounded w-3/4" />
                  <div className="h-4 bg-gray-950 rounded w-1/2" />
                </div>
                <div className="h-6 bg-gray-950 mr-1 rounded w-1/3" />
              </div>
            </div>
          ))}
      </div>

      <div ref={sentinelRef} className="h-1" />

      {!hasMore && !isInitialLoading && !loadingMore && !isEmpty && (
        <div className="text-center mt-2 text-gray-500">End of results</div>
      )}
    </div>
  );
});

export default ProductGrid;
