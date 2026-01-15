import { createCustomer } from "@/app/actions/customer";
import CustomerForm from "@/components/CustomerForm";
import PageHeader from "@/components/PageHeader";

export default function NewCustomerPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Nuovo Cliente"
        subtitle="Inserisci i dati per creare un nuovo cliente"
      />
      <CustomerForm action={createCustomer} />
    </div>
  );
}
