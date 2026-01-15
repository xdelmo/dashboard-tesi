'use server';

import { api } from '@/lib/api';
import { ActionState } from '@/types/action';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(prevState: ActionState, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const user = await api.users.findByEmail(email);

  if (user && user.password === password) {
    const payload = JSON.stringify({ userId: user.id, email: user.email });
    const token = Buffer.from(payload).toString('base64');

    const cookieStore = await cookies();
    cookieStore.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 settimana
      path: '/',
    });

    redirect('/');
  }

  return { message: 'Credenziali Non Corrette' };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/login');
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');

  if (!session?.value) {
    return null;
  }

  try {
    // Decodifica token
    const decoded = JSON.parse(
      Buffer.from(session.value, 'base64').toString('utf-8')
    );
    const user = await api.users.findByEmail(decoded.email);
    return user;
  } catch (error) {
    return null;
  }
}
