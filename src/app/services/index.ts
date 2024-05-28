import { auth } from '@/auth';

export const BE_ENDPOINT = process.env.BE_ENDPOINT || 'https://cosmetic-backend.vercel.app';

export class ApiResponse<T> {
  public status: number;
  public data: T;
  public info?: T;

  constructor(status: number, data: T, info?: T) {
    this.status = status;
    this.data = data;
    this.info = info;
  }
}

export class ApiError extends Error {
  public status: number;
  public info: any;

  constructor(status: number, info?: any) {
    super(info);
    this.status = status;
    this.info = info;
  }
}

export type ApiHeaders = {
  Authorization?: string | undefined;
};

export const buildHeaders = async () => {
  const headers: ApiHeaders = {};
  const session = await auth();
  console.log('GETTING SESSION', session);
  headers['Authorization'] = `Bearer ${session?.user?.access_token}`;

  return headers;
};
