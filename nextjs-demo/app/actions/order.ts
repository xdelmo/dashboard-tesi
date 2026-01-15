'use server';

import { api } from '@/lib/api';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteOrder(id: string) {
  await api.orders.delete(id);
  revalidatePath('/orders');
  revalidatePath('/');
  redirect('/orders');
}
