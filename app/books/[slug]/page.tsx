import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/product-details";
import { getBookBySlug } from "@/lib/books";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  return { title: book?.title ?? "Book", description: book?.description };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();
  return <ProductDetails book={book} />;
}
