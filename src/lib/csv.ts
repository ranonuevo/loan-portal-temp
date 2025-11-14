export function downloadCSV(rows: any[], filename = "opus-output.csv") {
  if (!rows || rows.length === 0) return;

  const headers = Object.keys(rows[0]);
  const csvRows = [
    headers.join(","), // header row
    ...rows.map(row => headers.map(h => `"${row[h] ?? ""}"`).join(",")),
  ];

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}
