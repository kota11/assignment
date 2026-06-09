export function escapeCSV(
  value: unknown
) {
  const str = String(value ?? "");

  if (
    str.includes(",") ||
    str.includes('"') ||
    str.includes("\n")
  ) {
    return `"${str.replace(
      /"/g,
      '""'
    )}"`;
  }

  return str;
}

export function generateCSV(
  rows: Record<string, any>[]
) {
  if (!rows.length) return "";

  const headers =
    Object.keys(rows[0]);

  return [
    headers.join(","),

    ...rows.map((row) =>
      headers
        .map((header) =>
          escapeCSV(
            row[header]
          )
        )
        .join(",")
    ),
  ].join("\n");
}