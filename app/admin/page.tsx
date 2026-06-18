"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { books, categories } from "@/lib/books";
import { DashboardStat } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

const stats: DashboardStat[] = [
  { label: "Revenue", value: formatCurrency(884500000), delta: "+18%" },
  { label: "Orders", value: "12,480", delta: "+24%" },
  { label: "Users", value: "48,120", delta: "+11%" },
  { label: "Top selling books", value: "1,000+", delta: "+31%" }
];

const columns: GridColDef[] = [
  { field: "title", headerName: "Book", flex: 1 },
  { field: "author", headerName: "Author", width: 190 },
  { field: "category", headerName: "Category", width: 150 },
  { field: "stock", headerName: "Stock", width: 100 },
  { field: "sold", headerName: "Sold", width: 100 }
];

export default function AdminPage() {
  return (
    <div className="container-x py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black">Admin dashboard</h1>
          <p className="text-muted-foreground">CRUD-ready controls for books, categories, authors, orders, users, and promotions.</p>
        </div>
        <Button>Add book</Button>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-5">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-2xl font-black">{stat.value}</p>
            <p className="mt-1 text-sm font-bold text-emerald-600">{stat.delta}</p>
          </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card className="overflow-hidden p-2">
          <div className="h-[620px]">
            <DataGrid rows={books.slice(0, 100).map((book) => ({ ...book }))} columns={columns} pageSizeOptions={[10, 25, 50]} initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} />
          </div>
        </Card>
        <div className="space-y-3">
          {["Books", "Categories", "Authors", "Orders", "Users", "Promotions"].map((item) => (
            <Card key={item} className="flex items-center justify-between p-4">
              <div>
                <b>{item}</b>
                <p className="text-sm text-muted-foreground">Create, read, update, delete</p>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </Card>
          ))}
          <Card className="p-4">
            <b>Categories</b>
            <p className="mt-2 text-sm text-muted-foreground">{categories.join(", ")}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
