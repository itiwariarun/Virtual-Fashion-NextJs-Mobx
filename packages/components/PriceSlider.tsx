"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { contentStore } from "../store";
import { Slider } from "./ui/slider";

const PriceSlider = observer(() => {
  const [range, setRange] = useState<[number, number]>([0, 999]);
  const minPrice = Math.min(...contentStore.contents.map((c) => c.price || 0));
  const maxPrice = 999;
  useEffect(() => {
    if (!contentStore.contents.length) return;

    const prices = contentStore.contents.map((c) => c.price || 0);
    const min = Math.min(...prices);
    const max = 999;

    setRange([min, max]);
    contentStore.setPriceRange(min, max);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentStore.contents]);
  useEffect(() => {
    if (contentStore.minPrice === null || contentStore.maxPrice === null) {
      setRange([minPrice, maxPrice]);
    } else {
      setRange([contentStore.minPrice, contentStore.maxPrice]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentStore.minPrice, contentStore.maxPrice, minPrice, maxPrice]);
  const handleChange = (value: number[]) => {
    if (value.length === 2) {
      setRange([value[0], value[1]]);
      contentStore.setPriceRange(value[0], value[1]);
    }
  };

  return (
    <div className="w-fit lg:ml-4 flex items-center gap-x-4">
      <div className="flex justify-between text-xs text-gray-600">
        <span>${range[0]}</span>
      </div>

      <Slider
        value={range}
        min={Math.min(...contentStore.contents.map((c) => c.price || 0))}
        max={999}
        className="w-44"
        onValueChange={handleChange}
      />
      <div className="flex justify-between text-xs text-gray-600">
        <span>${range[1]}</span>
      </div>
    </div>
  );
});

export default PriceSlider;
