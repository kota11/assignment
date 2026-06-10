import { api } from "./client";

const ENDPOINT = "records";

export async function fetchRecords(params: any) {
  const response = await api.get(ENDPOINT, { params });

  return {
    rows: response.data,
    total: Number(response.headers["x-total-count"] || 30000),
  };
}

export async function updateRecord(id: string | number, payload: any) {
  return api.patch(`${ENDPOINT}/${id}`, payload);
}