import { ContentItem } from "../types";

const MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export const fetchContents = async (): Promise<ContentItem[]> => {
  if (MOCK) {
    const res = await import("../utils/contents.json");
    return res.default;
  }

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/data");
    return await response.json();
  } catch (err) {
    console.error("Error fetching contents:", err);
    return [];
  }
};
