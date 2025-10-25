export enum PricingOption {
  PAID = 0,
  FREE = 1,
  VIEW_ONLY = 2,
}
export enum SortOption {
  NAME = "Item Name (Default)",
  PRICE_HIGH = "Higher Price",
  PRICE_LOW = "Lower Price",
}
export type ContentItem = {
  id: string;
  title: string;
  userName: string;
  pricingOption: PricingOption;
  price?: number;
  imagePath?: string;
  creator?: string;
};
