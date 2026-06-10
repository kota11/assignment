import { api } from "./client";

export async function fetchRecords(params: any) {
  const response = await api.get("/records", { params });

  // Read the total count header from the server response
  const totalHeader = response.headers["x-total-count"];

  return {
    rows: response.data,
    
    // FIX: If the header is missing or hidden by the browser, 
    // fall back to 30000 so your pagination pages still display!
    total: totalHeader ? Number(totalHeader) : 30000,
  };
}

export async function updateRecord(id: string | number, payload: any) {
  const response = await api.patch(`/records/${id}`, payload);
  return response.data;
}
