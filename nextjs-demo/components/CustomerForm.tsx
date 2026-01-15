"use client";

import { useActionState } from "react";
import { Customer } from "@/types";
import { ActionState } from "@/types/action";
import Link from "next/link";

interface CustomerFormProps {
  action: (state: ActionState, payload: FormData) => Promise<ActionState>;
  initialData?: Customer;
}

const initialState = {
  message: "",
};

export default function CustomerForm({
  action,
  initialData,
}: CustomerFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="col-span-2">
            <h3 className="text-lg font-medium text-slate-900 mb-4">
              {initialData ? "Modifica Cliente" : "Nuovo Cliente"}
            </h3>
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700"
            >
              Nome Completo
            </label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={initialData?.name}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border text-slate-900 placeholder:text-slate-500 bg-white"
              placeholder="Mario Rossi"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={initialData?.email}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border text-slate-900 placeholder:text-slate-500 bg-white"
              placeholder="mario@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-slate-700"
            >
              Azienda
            </label>
            <input
              type="text"
              name="company"
              id="company"
              defaultValue={initialData?.company}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border text-slate-900 placeholder:text-slate-500 bg-white"
              placeholder="Nome Azienda"
            />
          </div>

          <div>
            <label
              htmlFor="industry"
              className="block text-sm font-medium text-slate-700"
            >
              Settore
            </label>
            <input
              type="text"
              name="industry"
              id="industry"
              defaultValue={initialData?.industry}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border text-slate-900 placeholder:text-slate-500 bg-white"
              placeholder="Es. Tecnologia"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-slate-700"
            >
              Stato
            </label>
            <select
              id="status"
              name="status"
              defaultValue={initialData?.status || "Attivo"}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border bg-white text-slate-900"
            >
              <option value="Attivo">Attivo</option>
              <option value="In Attesa">In Attesa</option>
              <option value="Inattivo">Inattivo</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="plan"
              className="block text-sm font-medium text-slate-700"
            >
              Piano
            </label>
            <select
              id="plan"
              name="plan"
              defaultValue={initialData?.plan || "Basic"}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border bg-white text-slate-900"
            >
              <option value="Basic">Basic</option>
              <option value="Professional">Professional</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
        </div>

        {state?.message && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {state.message}
          </div>
        )}

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
          <Link
            href="/customers"
            className="px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Annulla
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70"
          >
            {isPending ? "Salvataggio..." : "Salva Cliente"}
          </button>
        </div>
      </form>
    </div>
  );
}
