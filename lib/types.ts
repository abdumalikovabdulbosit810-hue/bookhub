export type CategoryName =
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
  slug: string;
  title: string;
  author: string;
  authorBio: string;
  coverImage: string;
  gallery: string[];
  description: string;
  category: CategoryName;
  rating: number;
  reviewsCount: number;
  price: number;
  discountPrice: number;
  stock: number;
  isbn: string;
  pages: number;
  language: string;
  sold: number;
  isNew?: boolean;
  isBestseller?: boolean;
  isTop100?: boolean;
  promotion?: string;
};

export type CartItem = {
  book: Book;
  quantity: number;
};

export type Review = {
  id: string;
  bookId: string;
  user: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type OrderPayload = {
  fullName: string;
  phone: string;
  region: string;
  district: string;
  address: string;
  notes?: string;
  items: CartItem[];
  total: number;
  coupon?: string;
};

export type DashboardStat = {
  label: string;
  value: string;
  delta: string;
};
