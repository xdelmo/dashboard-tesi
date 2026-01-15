import { api } from "@/lib/api";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { redirect } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await api.orders.getById(id);

  if (!order) {
    redirect("/orders");
  }

  const customer = await api.customers.getById(order.customerId);

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Dettaglio Ordine #${order.id}`}
        subtitle="Visualizza le informazioni complete dell'ordine"
      />

      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
          <div>
            <h2 className="m-0 text-2xl font-bold text-slate-800 capitalize">
              Ordine del{" "}
              {new Date(order.date).toLocaleDateString("it-IT", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </h2>
            <span className="text-slate-500 text-sm">ID: {order.id}</span>
          </div>
          <StatusBadge status={order.status} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h3 className="text-lg font-semibold mb-4 text-slate-800">
                Articoli Acquistati
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="text-slate-500 border-b border-slate-200">
                      <th className="pb-2 font-medium">Prodotto</th>
                      <th className="pb-2 font-medium">Categoria</th>
                      <th className="pb-2 font-medium text-right">Prezzo</th>
                      <th className="pb-2 font-medium text-right">Q.tà</th>
                      <th className="pb-2 font-medium text-right">Totale</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {order.items.map((item, idx) => (
                      <tr key={idx} className="group">
                        <td className="py-3 font-medium text-slate-900">
                          {item.name}
                        </td>
                        <td className="py-3">
                          <StatusBadge
                            status={(item as any).category || "N/A"}
                          />
                        </td>
                        <td className="py-3 text-right text-slate-600">
                          € {item.price}
                        </td>
                        <td className="py-3 text-right text-slate-600">
                          {item.quantity}
                        </td>
                        <td className="py-3 text-right font-bold text-slate-900">
                          € {item.price * item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-50 rounded-bl-full -mr-10 -mt-10"></div>
              <h3 className="text-lg font-semibold mb-4 text-slate-800 relative z-10">
                Cliente
              </h3>

              {customer ? (
                <div className="flex flex-col gap-2 relative z-10">
                  <Link
                    href={`/customers/${customer.id}`}
                    className="text-xl font-bold text-indigo-600 hover:underline"
                  >
                    {customer.name}
                  </Link>
                  <span className="text-slate-600">{customer.company}</span>
                  <span className="text-slate-500 text-sm">
                    {customer.email}
                  </span>
                  <div className="mt-2">
                    <StatusBadge status={customer.status} />
                  </div>
                </div>
              ) : (
                <p className="text-slate-500 italic">Cliente sconosciuto</p>
              )}
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h3 className="text-lg font-semibold mb-4 text-slate-800">
                Riepilogo
              </h3>
              <div className="flex flex-col gap-3 text-slate-700 text-sm">
                <div className="flex justify-between">
                  <span>Subtotale</span>
                  <span className="font-medium">
                    €{" "}
                    {((order as any).subtotal || order.total).toLocaleString(
                      "it-IT",
                      { minimumFractionDigits: 2 }
                    )}
                  </span>
                </div>
                {/* Only show discount if > 0 */}
                {(order as any).discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Sconto</span>
                    <span className="font-medium">
                      -€{" "}
                      {(order as any).discountAmount.toLocaleString("it-IT", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500">
                  <span>Tasse (IVA)</span>
                  <span className="font-medium">
                    €{" "}
                    {((order as any).tax || 0).toLocaleString("it-IT", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="border-t border-slate-300 my-2 pt-2 flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900">
                    Totale
                  </span>
                  <span className="text-2xl font-bold text-indigo-600">
                    €{" "}
                    {order.total.toLocaleString("it-IT", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-100 pt-6 mt-8 gap-4">
          <Link
            href="/orders"
            className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors font-medium flex items-center gap-2"
          >
            <i className="pi pi-arrow-left"></i> Indietro
          </Link>
        </div>
      </div>
    </div>
  );
}
