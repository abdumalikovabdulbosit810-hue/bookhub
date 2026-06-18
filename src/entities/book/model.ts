export type Category =
  | "Business"
  | "Programming"
  | "IELTS"
  | "English Learning"
  | "Self Development"
  | "Finance"
  | "Psychology"
  | "Novels"
  | "Fantasy"
  | "Technology";

export type Book = {
  id: string;
  title: string;
  author: string;
  category: Category;
  cover: string;
  description: string;
  rating: number;
  reviews: number;
  price: number;
  discountPrice: number;
  stock: number;
  sold: number;
  createdAt: string;
};

export type BookFilters = {
  search: string;
  category: Category | "All";
  rating: number;
  maxPrice: number;
  sort: "popular" | "rating" | "priceAsc" | "priceDesc" | "newest";
  page: number;
  pageSize: number;
};
