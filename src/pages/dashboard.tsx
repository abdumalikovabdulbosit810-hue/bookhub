import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart } from "recharts";
import { Activity, Clock, DollarSign, Gauge, Users } from "lucide-react";
import { books } from "@/entities/book/data";
import { useI18n } from "@/app/i18n/i18n-store";
import { Card } from "@/shared/ui/card";
import { formatCurrency, formatNumber } from "@/shared/lib/utils";

const revenue = [
  { name: "Jan", value: 280 },
  { name: "Feb", value: 360 },
  { name: "Mar", value: 520 },
  { name: "Apr", value: 640 },
  { name: "May", value: 790 },
  { name: "Jun", value: 980 }
];

export function DashboardPage() {
  const t = useI18n((state) => state.t);
  const kpis = [
    { label: "Revenue", value: formatCurrency(984_200_000), icon: DollarSign, delta: "+18.4%" },
    { label: "Users", value: formatNumber(48120), icon: Users, delta: "+11.2%" },
    { label: "Orders", value: formatNumber(12480), icon: Activity, delta: "+24.1%" },
    { label: "P95 Load", value: "740ms", icon: Gauge, delta: "-8.6%" }
  ];

  return (
    <main className="container-page py-8">
      <h1 className="text-4xl font-black">{t("dashboardTitle")}</h1>
      <p className="mt-1 text-muted-foreground">Professional KPIs, charts, tables, activity, and performance metrics.</p>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        {kpis.map(({ label, value, icon: Icon, delta }) => (
          <Card key={label} className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{label}</p>
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <p className="mt-3 text-2xl font-black">{value}</p>
            <p className="mt-1 text-sm font-bold text-success">{delta}</p>
          </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_420px]">
        <Card className="p-5">
          <h2 className="font-black">Revenue analytics</h2>
          <div className="mt-4 h-80">
            <ResponsiveContainer>
              <AreaChart data={revenue}>
                <defs><linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6D28D9" stopOpacity={0.35} /><stop offset="95%" stopColor="#6D28D9" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.18} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#6D28D9" fill="url(#revenue)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="font-black">{t("activity")}</h2>
          <div className="mt-4 space-y-3">
            {["Order KM-20391 approved", "Role Manager updated", "Binafsha Shulasi 2 promotion edited", "Security audit log exported"].map((item) => (
              <div key={item} className="flex gap-3 rounded-md bg-muted p-3">
                <Clock className="mt-0.5 h-4 w-4 text-primary" />
                <div><p className="text-sm font-bold">{item}</p><p className="text-xs text-muted-foreground">2 minutes ago</p></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="mt-6 p-5">
        <h2 className="font-black">Top selling books</h2>
        <div className="mt-4 h-72">
          <ResponsiveContainer>
            <BarChart data={books.slice(0, 8).map((book) => ({ name: book.title.slice(0, 12), sold: book.sold }))}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.18} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sold" fill="#6D28D9" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </main>
  );
}
