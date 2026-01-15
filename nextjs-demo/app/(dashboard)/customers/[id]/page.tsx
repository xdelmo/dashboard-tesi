import { updateCustomer } from "@/app/actions/customer";
import CustomerForm from "@/components/CustomerForm";
import { api } from "@/lib/api";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";

export default async function EditCustomerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const customer = await api.customers.getById(id);

  if (!customer) {
    notFound();
  }

  const updateAction = updateCustomer.bind(null, customer.id);

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Modifica Cliente"
        subtitle={`Modifica i dati di ${customer.name}`}
      />
      <CustomerForm action={updateAction} initialData={customer} />
    </div>
  );
}
