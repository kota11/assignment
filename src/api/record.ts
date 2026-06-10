import { api } from "./client";

export async function fetchRecords(params: any) {
  const response = await api.get("records", { params });

  return {
    rows: response.data,
    total: Number(response.headers["x-total-count"] || 30000),
  };
}

export async function updateRecord(id: string | number, payload: any) {
  const response = await api.patch(`records/${id}`, payload);
  return response.data;
}