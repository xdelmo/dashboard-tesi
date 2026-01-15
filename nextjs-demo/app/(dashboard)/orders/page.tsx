import { api } from "@/lib/api";
import PageHeader from "@/components/PageHeader";

export default async function OrdersPage() {
  const [orders, customers] = await Promise.all([
    api.orders.getAll(),
    api.customers.getAll(),
  ]);

  // Map customer names for easy lookup
  const customerMap = new Map(customers.map((c) => [c.id, c.name]));

  // Helper for status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pagato":
        return "bg-emerald-100 text-emerald-700";
      case "In Attesa":
        return "bg-amber-100 text-amber-700";
      case "Annullato":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

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
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-slate-600 font-mono text-xs">
                      {order.id}
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
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
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
