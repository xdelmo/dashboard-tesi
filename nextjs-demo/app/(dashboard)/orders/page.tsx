import { api } from "@/lib/api";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";

export default async function OrdersPage() {
  const [orders, customers] = await Promise.all([
    api.orders.getAll(),
    api.customers.getAll(),
  ]);

  const customerMap = new Map(customers.map((c) => [c.id, c.name]));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ordini Recenti"
        subtitle="Visualizza lo storico degli ordini dei clienti"
      />

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">
                  ID Ordine
                </th>
                <th className="px-6 py-4 font-semibold text-slate-700">
                  Cliente
                </th>
                <th className="px-6 py-4 font-semibold text-slate-700">Data</th>
                <th className="px-6 py-4 font-semibold text-slate-700">
                  Stato
                </th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-right">
                  Totale
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    Nessun ordine trovato.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/orders/${order.id}`}
                        className="font-mono text-xs text-indigo-600 hover:text-indigo-800 hover:underline font-medium"
                      >
                        {order.id}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">
                        {customerMap.get(order.customerId) ||
                          "Cliente Sconosciuto"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(order.date).toLocaleDateString("it-IT", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-slate-900">
                      €{" "}
                      {order.total.toLocaleString("it-IT", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
