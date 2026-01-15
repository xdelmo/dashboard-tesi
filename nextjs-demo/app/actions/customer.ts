'use server';

import { api } from '@/lib/api';
import { Customer } from '@/types';
import { ActionState } from '@/types/action';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createCustomer(
  prevState: ActionState,
  formData: FormData
) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const company = formData.get('company') as string;
  const status = formData.get('status') as Customer['status'];
  const plan = formData.get('plan') as Customer['plan'];
  const industry = formData.get('industry') as string;

  if (!name || !email) {
    return { message: 'Nome ed Email sono obbligatori' };
  }

  const newCustomer: Customer = {
    id: crypto.randomUUID(),
    name,
    email,
    company,
    status,
    plan,
    industry: industry || 'Technology',
  };

  await api.customers.create(newCustomer);
  revalidatePath('/customers');
  revalidatePath('/');
  redirect('/customers');
}

export async function updateCustomer(
  id: string,
  prevState: ActionState,
  formData: FormData
) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const company = formData.get('company') as string;
  const status = formData.get('status') as Customer['status'];
  const plan = formData.get('plan') as Customer['plan'];
  const industry = formData.get('industry') as string;

  if (!name || !email) {
    return { message: 'Nome ed Email sono obbligatori' };
  }

  await api.customers.update(id, {
    name,
    email,
    company,
    status,
    plan,
    industry,
  });

  revalidatePath('/customers');
  revalidatePath('/');
  redirect('/customers');
}

export async function deleteCustomer(id: string) {
  await api.customers.delete(id);
  revalidatePath('/customers');
  revalidatePath('/');
}
