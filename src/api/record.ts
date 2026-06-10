export async function fetchRecords(params: any) {
  const query = new URLSearchParams(params).toString();

  const res = await fetch(
    `https://backend-22xf.onrender.com/records?${query}`
  );

  const data = await res.json();

  return {
    rows: data,
    total: 30000,
  };
}

export async function updateRecord(id: string | number, payload: any) {
  const res = await fetch(
    `https://backend-22xf.onrender.com/records/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return res.json();
}