"use client";

import Image from "next/image";
import { Rate, Tabs } from "antd";
import { BookGrid } from "@/components/book-grid";
import { ProductActions } from "@/components/product-actions";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getSimilarBooks, reviews } from "@/lib/books";
import { Book } from "@/lib/types";
import { discountPercent, formatCurrency } from "@/lib/utils";

export function ProductDetails({ book }: { book: Book }) {
  const similar = getSimilarBooks(book);
  const bookReviews = reviews.filter((review) => review.bookId === book.id);

  return (
    <div className="container-x py-8">
      <div className="grid gap-8 lg:grid-cols-[520px_1fr]">
        <div className="grid gap-3 md:grid-cols-[90px_1fr]">
          <div className="order-2 flex gap-3 md:order-1 md:flex-col">
            {book.gallery.map((image) => (
              <div key={image} className="relative aspect-[3/4] w-20 overflow-hidden rounded-md border bg-muted">
                <Image src={image} alt={book.title} fill sizes="80px" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="relative order-1 aspect-[3/4] overflow-hidden rounded-lg border bg-muted md:order-2">
            <Image src={book.coverImage} alt={book.title} fill priority sizes="520px" className="object-cover" />
            <Badge className="absolute left-3 top-3 bg-amber-400 text-amber-950">-{discountPercent(book.price, book.discountPrice)}%</Badge>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap gap-2">
            {book.isBestseller && <Badge>Bestseller</Badge>}
            {book.isNew && <Badge className="bg-pink-600 text-white">New</Badge>}
            {book.promotion && <Badge className="bg-amber-400 text-amber-950">Special promotion</Badge>}
          </div>
          <h1 className="mt-4 text-3xl font-black md:text-5xl">{book.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{book.author}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Rate disabled allowHalf defaultValue={book.rating} />
            <span className="font-bold">{book.rating}</span>
            <span className="text-muted-foreground">{book.reviewsCount} reviews</span>
          </div>
          <div className="mt-6 rounded-lg bg-secondary p-5">
            <p className="text-sm text-muted-foreground line-through">{formatCurrency(book.price)}</p>
            <p className="text-4xl font-black text-primary">{formatCurrency(book.discountPrice)}</p>
            <p className="mt-2 text-sm font-semibold">Stock: {book.stock} books</p>
          </div>
          <ProductActions book={book} />
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {["Delivery in Tashkent from 1 day", "Pay online or on delivery", "Original print quality"].map((item) => (
              <Card key={item} className="p-4 text-sm font-semibold">{item}</Card>
            ))}
          </div>
        </div>
      </div>
      <Tabs
        className="mt-8"
        items={[
          { key: "description", label: "Description", children: <p className="max-w-4xl text-muted-foreground">{book.description}</p> },
          { key: "author", label: "Author details", children: <p className="max-w-4xl text-muted-foreground">{book.authorBio}</p> },
          {
            key: "reviews",
            label: "Reviews",
            children: (
              <div className="grid gap-3 md:grid-cols-2">
                {bookReviews.map((review) => (
                  <Card key={review.id} className="p-4">
                    <Rate disabled allowHalf defaultValue={review.rating} />
                    <p className="mt-2 font-bold">{review.user}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{review.comment}</p>
                  </Card>
                ))}
              </div>
            )
          }
        ]}
      />
      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-black">Similar books</h2>
        <BookGrid books={similar} />
      </section>
    </div>
  );
}
