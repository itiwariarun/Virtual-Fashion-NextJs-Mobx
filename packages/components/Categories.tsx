import { contentStore } from "../store";

import { observer } from "mobx-react";
import { PricingOption } from "../types";
import SortDropdown from "./SortDropdown";
import PriceSlider from "./PriceSlider";
import GlassIcon from "./icons/GlassIcon";

const Categories = observer(() => {
  return (
    <div className="flex flex-col gap-8">
      <div className="bg-search flex items-center justify-center relative p-4 rounded-md">
        <input
          type="text"
          value={contentStore.searchQuery}
          onChange={(e) => contentStore.setSearchQuery(e.target.value)}
          placeholder="Find the item's you are looking for"
          className="pl-4 pr-12 py-2 text-gray-50 font-medium tracking-wide placeholder:text-gray-500 border-0 w-full focus:ring-0 focus:outline-none"
        />
        <GlassIcon className="h-6 w-6 absolute flex top-[35%] right-8 text-gray-300 stroke-[2.5]" />
      </div>
      <nav
        aria-label="Categories"
        className="flex text-left bg-filter px-8 rounded-md items-center gap-2.5 py-4 font-medium text-gray-900"
      >
        <div className="flex justify-between gap-y-8 flex-wrap w-full gap-4 items-center">
          <span className="flex text-gray-500 gap-x-6 gap-y-2 text-sm w-full flex-wrap items-center">
            <span className="text-xs">Price Options :</span>
            <div className="flex gap-6">
              {Object.values(PricingOption)
                .filter((v) => typeof v === "number")
                .map((opt) => (
                  <div key={opt} className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          checked={contentStore.selectedPricingOptions.includes(
                            opt as PricingOption
                          )}
                          onChange={() =>
                            contentStore.togglePricingOption(
                              opt as PricingOption
                            )
                          }
                          id={opt.toString()}
                          name={opt.toString()}
                          type="checkbox"
                          aria-describedby="options price"
                          className="col-start-1 row-start-1 peer appearance-none rounded border border-gray-300 bg-gray-500 checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                        />
                      </div>
                    </div>{" "}
                    <div className="text-sm/6">
                      <label
                        htmlFor={opt.toString()}
                        className="font-medium text-gray-400 peer-checked:text-gray-100"
                      >
                        {opt === PricingOption.PAID
                          ? "Paid"
                          : opt === PricingOption.FREE
                          ? "Free"
                          : "View Only"}
                      </label>
                    </div>
                  </div>
                ))}
            </div>
            <PriceSlider />
          </span>

          <button
            className="text-gray-200 ml-auto border-0 font-semibold text-xs uppercase rounded bg-transparent cursor-pointer"
            onClick={() => contentStore.resetFilters()}
          >
            Reset
          </button>
        </div>
      </nav>
      <SortDropdown />
    </div>
  );
});

export default Categories;
