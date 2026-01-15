import { api } from "@/lib/api";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";

export default async function ProductsPage() {
  const products = await api.products.getAll();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Prodotti"
        subtitle="Gestisci il catalogo dei tuoi servizi e prodotti"
      />

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">
                  Nome Prodotto
                </th>
                <th className="px-6 py-4 font-semibold text-slate-700">
                  Categoria
                </th>
                <th className="px-6 py-4 font-semibold text-slate-700">
                  Prezzo
                </th>
                <th className="px-6 py-4 font-semibold text-slate-700">
                  Durata
                </th>
                <th className="px-6 py-4 font-semibold text-slate-700">
                  Stato
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    Nessun prodotto trovato.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">
                        {product.name}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {product.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-600">
                      € {product.price.toLocaleString("it-IT")}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {product.duration}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={product.status} />
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
