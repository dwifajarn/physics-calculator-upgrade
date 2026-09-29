export interface TeamMember {
  name: string;
  nim: string;
  role: string;
}

export const team: TeamMember[] = [
  { name: "Dwi Fajar Nugroho", nim: "230611002", role: "Informatika S1" },
  { name: "Igris Rizkia Kurniawan", nim: "230611011", role: "Informatika S1" },
  {
    name: "Pandu Kukuh Waskito Wibowo",
    nim: "230611018",
    role: "Informatika S1",
  },
];

/** First letters of the first two words, e.g. "Dwi Fajar Nugroho" -> "DF". */
export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
