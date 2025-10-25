import { makeAutoObservable, runInAction } from "mobx";
import qs from "query-string";
import { ContentItem, PricingOption, SortOption } from "../types";
import { fetchContents } from "../services/api";

export class ContentStore {
  contents: ContentItem[] = [];
  searchQuery: string = "";
  selectedPricingOptions: PricingOption[] = [];
  visibleCount: number = 20;
  pageSize: number = 20;
  loading: boolean = false;
  sortOption: SortOption = SortOption.NAME;

  minPrice: number | null = null;
  maxPrice: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  initFromQuery = (query: {
    q: string;
    pricing: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  }) => {
    if (query.q) this.searchQuery = query.q;
    if (query.pricing) {
      const values = query.pricing.split(",");
      this.selectedPricingOptions = values
        .map((v) => {
          switch (v) {
            case "0":
              return PricingOption.PAID;
            case "1":
              return PricingOption.FREE;
            case "2":
              return PricingOption.VIEW_ONLY;
            default:
              return null;
          }
        })
        .filter(Boolean) as PricingOption[];
    }
    if (
      query.sort &&
      Object.values(SortOption).includes(query.sort as SortOption)
    ) {
      this.sortOption = query.sort as SortOption;
    }
    if (query.minPrice) this.minPrice = Number(query.minPrice);
    if (query.maxPrice) this.maxPrice = Number(query.maxPrice);
  };

  loadContents = async () => {
    this.loading = true;
    try {
      const data = await fetchContents();
      runInAction(() => {
        this.contents = data;
        this.loading = false;
      });
    } catch (err) {
      console.error(err);
      runInAction(() => {
        this.contents = [];
        this.loading = false;
      });
    }
  };

  setSearchQuery = (q: string) => {
    this.searchQuery = q;
    this.visibleCount = this.pageSize;
    this.updateQuery();
  };

  togglePricingOption = (option: PricingOption) => {
    if (this.selectedPricingOptions.includes(option)) {
      this.selectedPricingOptions = this.selectedPricingOptions.filter(
        (p) => p !== option
      );
    } else {
      this.selectedPricingOptions.push(option);
    }
    this.visibleCount = this.pageSize;
    this.updateQuery();
  };

  setSortOption = (option: SortOption) => {
    this.sortOption = option;
    this.updateQuery();
  };

  setPriceRange = (min: number | null, max: number | null) => {
    this.minPrice = min;
    this.maxPrice = max;
    this.visibleCount = this.pageSize;
    this.updateQuery();
  };

  resetFilters = () => {
    this.searchQuery = "";
    this.selectedPricingOptions = [];
    this.visibleCount = this.pageSize;
    this.sortOption = SortOption.NAME;
    this.minPrice = null;
    this.maxPrice = null;
    this.updateQuery();
  };

  get filteredContents() {
    let items = this.contents;

    if (this.selectedPricingOptions.length > 0) {
      items = items.filter((item) =>
        this.selectedPricingOptions.includes(item.pricingOption)
      );
    }

    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          (item?.creator?.toLowerCase().includes(q) ?? false) ||
          (item.title?.toLowerCase().includes(q) ?? false)
      );
    }

    if (this.minPrice != null)
      items = items.filter((item) => (item.price ?? 0) >= this.minPrice!);
    if (this.maxPrice != null)
      items = items.filter((item) => (item.price ?? 0) <= this.maxPrice!);

    items = [...items];
    switch (this.sortOption) {
      case SortOption.NAME:
        items.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case SortOption.PRICE_HIGH:
        items = items
          .filter((item) => item.pricingOption === PricingOption.PAID)
          .sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case SortOption.PRICE_LOW:
        items = items
          .filter((item) => item.pricingOption === PricingOption.PAID)
          .sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
    }

    return items;
  }

  get visibleContents() {
    return this.filteredContents.slice(0, this.visibleCount);
  }

  increaseVisibleCount = () => {
    if (this.visibleCount < this.filteredContents.length)
      this.visibleCount += this.pageSize;
  };

  updateQuery = () => {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const qsObj: any = {};
    if (this.searchQuery) qsObj.q = this.searchQuery;
    if (this.selectedPricingOptions.length > 0)
      qsObj.pricing = this.selectedPricingOptions.join(",");
    if (this.sortOption && this.sortOption !== SortOption.NAME)
      qsObj.sort = this.sortOption;
    if (this.minPrice != null) qsObj.minPrice = this.minPrice;
    if (this.maxPrice != null) qsObj.maxPrice = this.maxPrice;
    const queryString = qs.stringify(qsObj);
    window.history.replaceState(null, "", "?" + queryString);
  };
}

export const contentStore = new ContentStore();

// Expose the store for Cypress testing
if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.contentStore = contentStore;
}
