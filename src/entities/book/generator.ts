import { Book, Category } from "@/entities/book/model";

export const BOOK_COUNT = 10000;

export const categories: Category[] = [
  "Business",
  "Programming",
  "IELTS",
  "English Learning",
  "Self Development",
  "Finance",
  "Psychology",
  "Novels",
  "Fantasy",
  "Technology"
];

const titles: Record<Category, [string, string][]> = {
  Business: [["Good to Great", "Jim Collins"], ["Zero to One", "Peter Thiel"], ["The Lean Startup", "Eric Ries"], ["Rework", "Jason Fried"]],
  Programming: [["Clean Code", "Robert C. Martin"], ["The Pragmatic Programmer", "Andrew Hunt"], ["Effective TypeScript", "Dan Vanderkam"], ["System Design Interview", "Alex Xu"]],
  IELTS: [["Cambridge IELTS Academic 18", "Cambridge"], ["Target Band 7", "Simone Braverman"], ["IELTS Trainer", "Louise Hashemi"], ["Vocabulary for IELTS", "Pauline Cullen"]],
  "English Learning": [["English Grammar in Use", "Raymond Murphy"], ["Word Power Made Easy", "Norman Lewis"], ["Practical English Usage", "Michael Swan"], ["Oxford Word Skills", "Ruth Gairns"]],
  "Self Development": [["Atomic Habits", "James Clear"], ["Deep Work", "Cal Newport"], ["Mindset", "Carol Dweck"], ["Essentialism", "Greg McKeown"]],
  Finance: [["The Psychology of Money", "Morgan Housel"], ["The Intelligent Investor", "Benjamin Graham"], ["Rich Dad Poor Dad", "Robert Kiyosaki"], ["Principles", "Ray Dalio"]],
  Psychology: [["Thinking, Fast and Slow", "Daniel Kahneman"], ["Influence", "Robert Cialdini"], ["Flow", "Mihaly Csikszentmihalyi"], ["Quiet", "Susan Cain"]],
  Novels: [["Binafsha Shulasi 2", "Kitob Market Editions"], ["1984", "George Orwell"], ["The Alchemist", "Paulo Coelho"], ["The Kite Runner", "Khaled Hosseini"]],
  Fantasy: [["The Hobbit", "J. R. R. Tolkien"], ["Mistborn", "Brandon Sanderson"], ["A Game of Thrones", "George R. R. Martin"], ["The Name of the Wind", "Patrick Rothfuss"]],
  Technology: [["Life 3.0", "Max Tegmark"], ["AI Superpowers", "Kai-Fu Lee"], ["Inspired", "Marty Cagan"], ["The Innovators", "Walter Isaacson"]]
};

export function bookCover(index: number) {
  return `https://picsum.photos/seed/kitob-${index}/400/600`;
}

export function generateBook(index: number): Book {
  const categoryIndex = index % categories.length;
  const category = categories[categoryIndex];
  const pool = titles[category];
  const [title, author] = pool[index % pool.length];
  const edition = Math.floor(index / pool.length) + 1;
  const price = 49000 + ((index * 9200 + categoryIndex * 17000) % 340000);
  const discount = 0.08 + ((index + categoryIndex) % 8) * 0.025;

  return {
    id: String(index),
    title: edition === 1 ? title : `${title} · Premium Edition ${edition}`,
    author,
    category,
    cover: bookCover(index),
    description: `A carefully curated ${category.toLowerCase()} title selected for Kitob Market readers, teams, students, and professionals.`,
    rating: Number((4.1 + ((index + categoryIndex) % 9) / 10).toFixed(1)),
    reviews: 60 + ((index * 73 + categoryIndex * 11) % 9800),
    price,
    discountPrice: Math.round((price * (1 - discount)) / 1000) * 1000,
    stock: 7 + ((index * 19) % 260),
    sold: 50 + ((index * 131 + categoryIndex * 29) % 18000),
    createdAt: new Date(2026, (index + categoryIndex) % 12, (index % 27) + 1).toISOString()
  };
}

export function getBookById(id: string): Book | null {
  const index = Number(id);
  if (!Number.isInteger(index) || index < 0 || index >= BOOK_COUNT) return null;
  return generateBook(index);
}

export function getPromoBook(): Book {
  for (let i = 0; i < BOOK_COUNT; i++) {
    const book = generateBook(i);
    if (book.title.startsWith("Binafsha Shulasi 2")) return book;
  }
  return generateBook(0);
}

export function getBestSellers(count: number): Book[] {
  return Array.from({ length: count }, (_, i) => generateBook(i * 17 + 3));
}
