export const classNames=(...classes: string[])=> {
  return classes.filter(Boolean).join(" ");
}


export const getCategoryParam = (search: string) => {
  return new URLSearchParams(search).get("category") || undefined;
};

export const getSortParam = (search: string) => {
  return new URLSearchParams(search).get("sort") || "";
};

export const getSortOptions = (sortParam: string) => [
  { name: "Most Popular", value: "", current: sortParam === "" },
  { name: "Price: Low to High", value: "asc", current: sortParam === "asc" },
  { name: "Price: High to Low", value: "desc", current: sortParam === "desc" },
];
