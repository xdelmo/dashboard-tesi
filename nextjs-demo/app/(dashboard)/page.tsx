import { api } from "@/lib/api";
import StatCard from "@/components/StatCard";
import PageHeader from "@/components/PageHeader";
import RevenueChart from "@/components/RevenueChart";

export default async function DashboardPage() {
  const stats = await api.stats.getAll();
  const customers = await api.customers.getAll();
  const orders = await api.orders.getAll();

  const totalRevenue = stats.reduce(
    (acc: number, curr) => acc + curr.totalRevenue,
    0
  );
  const totalOrders = stats.reduce(
    (acc: number, curr) => acc + curr.totalOrders,
    0
  );
  const totalCustomers = customers.length;

  const activeCustomers = customers.filter((c) => c.status === "Attivo").length;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Overview"
        subtitle="Monitora le performance key di business e l'attività dei clienti"
      />

      <div className="stats-grid">
        <StatCard
          title="Fatturato Totale"
          value={new Intl.NumberFormat("it-IT", {
            style: "currency",
            currency: "EUR",
          }).format(totalRevenue)}
          icon="pi-dollar"
          colorClass="blue"
        />
        <StatCard
          title="Ordini in Attesa"
          value={Math.floor(totalOrders)}
          icon="pi-clock"
          colorClass="purple"
        />
        <StatCard
          title="Clienti Attivi"
          value={activeCustomers}
          icon="pi-check-circle"
          colorClass="green"
        />
        <StatCard
          title="Totale Clienti"
          value={totalCustomers}
          icon="pi-users"
          colorClass="orange"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-6">
          Andamento Fatturato
        </h3>
        <RevenueChart orders={orders} />
      </div>
    </div>
  );
}
