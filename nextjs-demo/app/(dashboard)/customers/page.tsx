import { api } from "@/lib/api";
import Link from "next/link";
import { deleteCustomer } from "@/app/actions/customer";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";

export default async function CustomersPage() {
  const customers = await api.customers.getAll();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestione Clienti"
        subtitle="Visualizza e gestisci la lista dei tuoi clienti"
      >
        <Link
          href="/customers/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm"
        >
          <i className="pi pi-plus"></i>
          <span>Nuovo Cliente</span>
        </Link>
      </PageHeader>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">Nome</th>
                <th className="px-6 py-4 font-semibold text-slate-700">
                  Contatto
                </th>
                <th className="px-6 py-4 font-semibold text-slate-700">
                  Stato
                </th>
                <th className="px-6 py-4 font-semibold text-slate-700">
                  Piano
                </th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-right">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">
                      {customer.name}
                    </div>
                    <div className="text-slate-500 text-xs">
                      {customer.company}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{customer.email}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={customer.status} />
                  </td>
                  <td className="px-6 py-4 text-slate-500">{customer.plan}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/customers/${customer.id}`}
                        className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                      >
                        <i className="pi pi-pencil"></i>
                      </Link>

                      <form action={deleteCustomer.bind(null, customer.id)}>
                        <button className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                          <i className="pi pi-trash"></i>
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
