import { Book, CategoryName, Review } from "@/lib/types";
import { slugify } from "@/lib/utils";

export const categories: CategoryName[] = [
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

const catalog: Record<CategoryName, { title: string; author: string }[]> = {
  Business: [
    { title: "Good to Great", author: "Jim Collins" },
    { title: "The Lean Startup", author: "Eric Ries" },
    { title: "Zero to One", author: "Peter Thiel" },
    { title: "The Hard Thing About Hard Things", author: "Ben Horowitz" },
    { title: "Blue Ocean Strategy", author: "W. Chan Kim" },
    { title: "Built to Last", author: "Jim Collins" },
    { title: "Measure What Matters", author: "John Doerr" },
    { title: "The Innovator's Dilemma", author: "Clayton Christensen" },
    { title: "Start with Why", author: "Simon Sinek" },
    { title: "Rework", author: "Jason Fried" }
  ],
  Programming: [
    { title: "Clean Code", author: "Robert C. Martin" },
    { title: "The Pragmatic Programmer", author: "Andrew Hunt" },
    { title: "Design Patterns", author: "Erich Gamma" },
    { title: "Refactoring", author: "Martin Fowler" },
    { title: "You Don't Know JS Yet", author: "Kyle Simpson" },
    { title: "Effective TypeScript", author: "Dan Vanderkam" },
    { title: "Domain-Driven Design", author: "Eric Evans" },
    { title: "Introduction to Algorithms", author: "Thomas H. Cormen" },
    { title: "Code Complete", author: "Steve McConnell" },
    { title: "System Design Interview", author: "Alex Xu" }
  ],
  IELTS: [
    { title: "Cambridge IELTS Academic 18", author: "Cambridge University Press" },
    { title: "Official IELTS Practice Materials", author: "Cambridge English" },
    { title: "Barron's IELTS Superpack", author: "Lin Lougheed" },
    { title: "IELTS Trainer", author: "Louise Hashemi" },
    { title: "Target Band 7", author: "Simone Braverman" },
    { title: "Collins Reading for IELTS", author: "Els Van Geyte" },
    { title: "Collins Writing for IELTS", author: "Anneli Williams" },
    { title: "Vocabulary for IELTS", author: "Pauline Cullen" },
    { title: "Grammar for IELTS", author: "Diane Hopkins" },
    { title: "Mindset for IELTS", author: "Greg Archer" }
  ],
  "English Learning": [
    { title: "English Grammar in Use", author: "Raymond Murphy" },
    { title: "Word Power Made Easy", author: "Norman Lewis" },
    { title: "Practical English Usage", author: "Michael Swan" },
    { title: "Oxford Word Skills", author: "Ruth Gairns" },
    { title: "English Vocabulary in Use", author: "Michael McCarthy" },
    { title: "Speak English Like an American", author: "Amy Gillett" },
    { title: "Ship or Sheep?", author: "Ann Baker" },
    { title: "Essential Grammar in Use", author: "Raymond Murphy" },
    { title: "Advanced Grammar in Use", author: "Martin Hewings" },
    { title: "English Collocations in Use", author: "Michael McCarthy" }
  ],
  "Self Development": [
    { title: "Atomic Habits", author: "James Clear" },
    { title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey" },
    { title: "Deep Work", author: "Cal Newport" },
    { title: "The Power of Habit", author: "Charles Duhigg" },
    { title: "Can't Hurt Me", author: "David Goggins" },
    { title: "Mindset", author: "Carol S. Dweck" },
    { title: "Essentialism", author: "Greg McKeown" },
    { title: "The One Thing", author: "Gary Keller" },
    { title: "Getting Things Done", author: "David Allen" },
    { title: "Make Time", author: "Jake Knapp" }
  ],
  Finance: [
    { title: "The Intelligent Investor", author: "Benjamin Graham" },
    { title: "Rich Dad Poor Dad", author: "Robert T. Kiyosaki" },
    { title: "The Psychology of Money", author: "Morgan Housel" },
    { title: "A Random Walk Down Wall Street", author: "Burton Malkiel" },
    { title: "The Richest Man in Babylon", author: "George S. Clason" },
    { title: "Common Stocks and Uncommon Profits", author: "Philip Fisher" },
    { title: "One Up On Wall Street", author: "Peter Lynch" },
    { title: "Your Money or Your Life", author: "Vicki Robin" },
    { title: "The Little Book of Common Sense Investing", author: "John C. Bogle" },
    { title: "Principles", author: "Ray Dalio" }
  ],
  Psychology: [
    { title: "Thinking, Fast and Slow", author: "Daniel Kahneman" },
    { title: "Influence", author: "Robert B. Cialdini" },
    { title: "Man's Search for Meaning", author: "Viktor E. Frankl" },
    { title: "Emotional Intelligence", author: "Daniel Goleman" },
    { title: "The Body Keeps the Score", author: "Bessel van der Kolk" },
    { title: "Predictably Irrational", author: "Dan Ariely" },
    { title: "Flow", author: "Mihaly Csikszentmihalyi" },
    { title: "Games People Play", author: "Eric Berne" },
    { title: "Quiet", author: "Susan Cain" },
    { title: "Grit", author: "Angela Duckworth" }
  ],
  Novels: [
    { title: "The Alchemist", author: "Paulo Coelho" },
    { title: "To Kill a Mockingbird", author: "Harper Lee" },
    { title: "1984", author: "George Orwell" },
    { title: "Pride and Prejudice", author: "Jane Austen" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { title: "The Kite Runner", author: "Khaled Hosseini" },
    { title: "A Thousand Splendid Suns", author: "Khaled Hosseini" },
    { title: "The Book Thief", author: "Markus Zusak" },
    { title: "Crime and Punishment", author: "Fyodor Dostoevsky" },
    { title: "The Catcher in the Rye", author: "J. D. Salinger" }
  ],
  Fantasy: [
    { title: "The Hobbit", author: "J. R. R. Tolkien" },
    { title: "Harry Potter and the Philosopher's Stone", author: "J. K. Rowling" },
    { title: "The Name of the Wind", author: "Patrick Rothfuss" },
    { title: "A Game of Thrones", author: "George R. R. Martin" },
    { title: "The Way of Kings", author: "Brandon Sanderson" },
    { title: "Mistborn", author: "Brandon Sanderson" },
    { title: "The Final Empire", author: "Brandon Sanderson" },
    { title: "The Lion, the Witch and the Wardrobe", author: "C. S. Lewis" },
    { title: "American Gods", author: "Neil Gaiman" },
    { title: "The Blade Itself", author: "Joe Abercrombie" }
  ],
  Technology: [
    { title: "The Singularity Is Near", author: "Ray Kurzweil" },
    { title: "Life 3.0", author: "Max Tegmark" },
    { title: "The Innovators", author: "Walter Isaacson" },
    { title: "AI Superpowers", author: "Kai-Fu Lee" },
    { title: "Hooked", author: "Nir Eyal" },
    { title: "Don't Make Me Think", author: "Steve Krug" },
    { title: "The Design of Everyday Things", author: "Don Norman" },
    { title: "Inspired", author: "Marty Cagan" },
    { title: "Sprint", author: "Jake Knapp" },
    { title: "The Phoenix Project", author: "Gene Kim" }
  ]
};

const coverIds = [240727, 8231856, 10521270, 12645119, 9255566, 11153223, 10389354, 9875545, 8775111, 10053243];

export function generateBooks(count = 1000): Book[] {
  const books: Book[] = [];
  categories.forEach((category, categoryIndex) => {
    const base = catalog[category];
    for (let i = 0; i < count / categories.length; i += 1) {
      const source = base[i % base.length];
      const edition = Math.floor(i / base.length) + 1;
      const title = edition === 1 ? source.title : `${source.title}: Marketplace Edition ${edition}`;
      const id = `${categoryIndex + 1}-${i + 1}`;
      const price = 45000 + ((i * 7300 + categoryIndex * 11000) % 310000);
      const discount = 0.08 + ((i + categoryIndex) % 7) * 0.03;
      const coverId = coverIds[(i + categoryIndex) % coverIds.length];
      books.push({
        id,
        slug: `${slugify(title)}-${id}`,
        title,
        author: source.author,
        authorBio: `${source.author} is a widely read author in ${category.toLowerCase()}, selected by Kitob Market editors for practical value and reader love.`,
        coverImage: `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`,
        gallery: [
          `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`,
          `https://covers.openlibrary.org/b/id/${coverIds[(i + 2) % coverIds.length]}-L.jpg`,
          `https://covers.openlibrary.org/b/id/${coverIds[(i + 4) % coverIds.length]}-L.jpg`
        ],
        description: `${title} by ${source.author} is a trusted ${category.toLowerCase()} book with clear explanations, strong reader feedback, and marketplace-ready availability across Uzbekistan.`,
        category,
        rating: Number((4.1 + ((i + categoryIndex) % 9) / 10).toFixed(1)),
        reviewsCount: 40 + ((i * 37 + categoryIndex) % 9000),
        price,
        discountPrice: Math.round(price * (1 - discount) / 1000) * 1000,
        stock: 8 + ((i * 17) % 240),
        isbn: `978-${categoryIndex + 1}${String(i + 100000000).slice(0, 9)}`,
        pages: 160 + ((i * 13) % 620),
        language: i % 4 === 0 ? "Uzbek" : i % 3 === 0 ? "Russian" : "English",
        sold: 25 + ((i * 97 + categoryIndex * 31) % 14000),
        isNew: i % 11 === 0,
        isBestseller: i % 6 === 0,
        isTop100: books.length < 100
      });
    }
  });

  books.unshift({
    id: "promo-binafsha-shulasi-2",
    slug: "binafsha-shulasi-2",
    title: "Binafsha Shulasi 2",
    author: "Kitob Market Editions",
    authorBio: "Kitob Market Editions curates special releases and reader-favorite collections for local marketplace campaigns.",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=900&auto=format&fit=crop"
    ],
    description: "A special Kitob Market promotion with a bold seasonal discount, premium packaging, and a limited sale badge on the homepage.",
    category: "Novels",
    rating: 4.9,
    reviewsCount: 12842,
    price: 149000,
    discountPrice: 89000,
    stock: 420,
    isbn: "978-6-282-900002",
    pages: 384,
    language: "Uzbek",
    sold: 22000,
    isNew: true,
    isBestseller: true,
    isTop100: true,
    promotion: "Binafsha Shulasi 2"
  });

  return books.slice(0, count + 1);
}

export const books = generateBooks();

export const reviews: Review[] = books.slice(0, 20).flatMap((book, index) => [
  {
    id: `${book.id}-r1`,
    bookId: book.id,
    user: index % 2 ? "Dilshod Karimov" : "Madina Akramova",
    rating: Math.min(5, book.rating),
    comment: "Fast delivery, clean print quality, and the recommendation was exactly what I needed.",
    createdAt: "2026-05-14"
  },
  {
    id: `${book.id}-r2`,
    bookId: book.id,
    user: index % 2 ? "Aziza Rasulova" : "Javohir Saidov",
    rating: 4.7,
    comment: "The book arrived well packed. I liked the similar books section too.",
    createdAt: "2026-06-02"
  }
]);

export function getBookBySlug(slug: string) {
  return books.find((book) => book.slug === slug);
}

export function getSimilarBooks(book: Book, limit = 8) {
  return books.filter((item) => item.category === book.category && item.id !== book.id).slice(0, limit);
}

export function searchBooks(query: string, filters?: Partial<{ category: string; author: string; minRating: number; maxPrice: number; sort: string }>) {
  const normalized = query.toLowerCase();
  let result = books.filter((book) => {
    const matchesQuery = [book.title, book.author, book.category].join(" ").toLowerCase().includes(normalized);
    const matchesCategory = !filters?.category || filters.category === "All" || book.category === filters.category;
    const matchesAuthor = !filters?.author || book.author.toLowerCase().includes(filters.author.toLowerCase());
    const matchesRating = !filters?.minRating || book.rating >= filters.minRating;
    const matchesPrice = !filters?.maxPrice || book.discountPrice <= filters.maxPrice;
    return matchesQuery && matchesCategory && matchesAuthor && matchesRating && matchesPrice;
  });

  if (filters?.sort === "price-asc") result = result.sort((a, b) => a.discountPrice - b.discountPrice);
  if (filters?.sort === "price-desc") result = result.sort((a, b) => b.discountPrice - a.discountPrice);
  if (filters?.sort === "rating") result = result.sort((a, b) => b.rating - a.rating);
  if (filters?.sort === "popular") result = result.sort((a, b) => b.sold - a.sold);
  return result;
}
