"use client";

import { observer } from "mobx-react";
import { contentStore } from "../store";
import { SortOption } from "../types";

const SortDropdown = observer(() => {
  return (
    <div className="mb-4 ml-auto">
      <label
        htmlFor="sort"
        className="mr-2 font-semibold text-sm text-gray-200"
      >
        Sort by
      </label>
      <select
        id="sort"
        value={contentStore.sortOption}
        onChange={(e) =>
          contentStore.setSortOption(e.target.value as SortOption)
        }
        className="border-b text-gray-200 text-sm ml-4 border-b-gray-400 px-3 py-1"
      >
        {Object.values(SortOption).map((option) => (
          <option className="text-black" key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default SortDropdown;
