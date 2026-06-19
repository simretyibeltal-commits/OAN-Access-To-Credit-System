
import { fetchApi } from '@/lib/api/fetchApi';

export interface RawUserResponse {
  email: string;
  full_name: string;
  roles: string[];
  bank: string | null;
  [key: string]: unknown;
}

export interface LoginApiResponse {
  success?: boolean;
  message?: string;
  user?: RawUserResponse;
}

interface LoginCredentials {
  usr: string;
  pwd: string;
}

export async function loginUser({ usr, pwd }: LoginCredentials): Promise<RawUserResponse> {
  const res = await fetch(`/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ usr, pwd }),
  });

  const data = (await res.json().catch(() => ({}))) as LoginApiResponse;

  if (!res.ok) {
    throw new Error(data.message || 'Invalid credentials. Please try again.');
  }

  if (!data.user) {
    throw new Error('Malformed API response: message.user is missing');
  }

  return data.user;
}

export async function getMe(): Promise<RawUserResponse> {
  const data = await fetchApi('oan_a2c.api.auth.get_me', {
    method: 'GET',
  });

  if (data?.data) {
    return data.data;
  }

  throw new Error('Malformed get_me API response');
}
