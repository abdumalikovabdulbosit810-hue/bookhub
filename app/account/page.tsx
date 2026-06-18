"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, Heart, MapPin, Package, Settings, UserRound } from "lucide-react";
import { Tabs } from "antd";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { books } from "@/lib/books";
import { useWishlistStore } from "@/store/wishlist-store";
import { formatCurrency } from "@/lib/utils";

export default function AccountPage() {
  const wishlist = useWishlistStore((state) => state.ids);
  const wishedBooks = books.filter((book) => wishlist.includes(book.id)).slice(0, 20);

  return (
    <div className="container-x py-8">
      <h1 className="text-3xl font-black">User account</h1>
      <Tabs
        className="mt-6"
        items={[
          {
            key: "profile",
            label: <span><UserRound className="mr-2 inline h-4 w-4" />Profile</span>,
            children: <Card className="p-5"><h2 className="text-xl font-black">Reader profile</h2><p className="mt-2 text-muted-foreground">Manage your personal information, phone number, and marketplace preferences.</p></Card>
          },
          {
            key: "orders",
            label: <span><Package className="mr-2 inline h-4 w-4" />Orders</span>,
            children: <div className="grid gap-3">{["KM-1042", "KM-1039", "KM-1028"].map((id, index) => <Card key={id} className="flex items-center justify-between p-4"><div><b>{id}</b><p className="text-sm text-muted-foreground">Delivered order with {index + 2} books</p></div><Button variant="outline">Details</Button></Card>)}</div>
          },
          {
            key: "wishlist",
            label: <span><Heart className="mr-2 inline h-4 w-4" />Wishlist</span>,
            children: wishedBooks.length ? (
              <div className="grid gap-3 md:grid-cols-2">
                {wishedBooks.map((book) => (
                  <Link key={book.id} href={`/books/${book.slug}`} className="flex gap-3 rounded-lg border bg-card p-3">
                    <div className="relative h-24 w-16 overflow-hidden rounded-md bg-muted"><Image src={book.coverImage} alt={book.title} fill sizes="64px" className="object-cover" /></div>
                    <div><b>{book.title}</b><p className="text-sm text-muted-foreground">{book.author}</p><p className="mt-2 font-bold text-primary">{formatCurrency(book.discountPrice)}</p></div>
                  </Link>
                ))}
              </div>
            ) : <Card className="p-5">Wishlist is empty.</Card>
          },
          { key: "addresses", label: <span><MapPin className="mr-2 inline h-4 w-4" />Addresses</span>, children: <Card className="p-5">Tashkent, Yunusabad, saved delivery address.</Card> },
          { key: "notifications", label: <span><Bell className="mr-2 inline h-4 w-4" />Notifications</span>, children: <Card className="p-5">Flash sale alerts and delivery updates are enabled.</Card> },
          { key: "settings", label: <span><Settings className="mr-2 inline h-4 w-4" />Settings</span>, children: <Card className="p-5">Language, theme, and privacy controls.</Card> }
        ]}
      />
    </div>
  );
}
