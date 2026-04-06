import axios from "./axios";

type ApiOptions = {
  showToastOnError?: boolean;
};

export async function apiGet<T = any>(url: string, params?: any, opts: ApiOptions = {}) {
  try {
    const res = await axios.get<T>(url, { params });
    return res.data;
  } catch (err) {
    if (opts.showToastOnError) {
      // lazy: import sonner when needed to avoid hard deps here
      try { const { toast } = await import('sonner'); toast.error((err as any)?.response?.data?.message ?? 'Request failed'); } catch (e) {}
    }
    throw err;
  }
}

export async function apiPost<T = any>(url: string, body?: any, opts: ApiOptions = {}) {
  try {
    const res = await axios.post<T>(url, body);
    return res.data;
  } catch (err) {
    if (opts.showToastOnError) {
      try { const { toast } = await import('sonner'); toast.error((err as any)?.response?.data?.message ?? 'Request failed'); } catch (e) {}
    }
    throw err;
  }
}

export default { apiGet, apiPost };
