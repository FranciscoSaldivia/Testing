import type { Cliente } from "@/data/clients";

export interface CountryStat {
  reclamos: number;
  pais: string;
  continente: string;
}

/**
 * Agrupa los clientes por countryId, sumando sus reclamos.
 * Un mismo pais puede tener mas de un cliente (ej. Chile).
 */
export function buildCountryStats(clients: Cliente[]): Map<string, CountryStat> {
  const stats = new Map<string, CountryStat>();
  for (const client of clients) {
    const existing = stats.get(client.countryId);
    if (existing) {
      existing.reclamos += client.reclamos;
    } else {
      stats.set(client.countryId, {
        reclamos: client.reclamos,
        pais: client.pais,
        continente: client.continente,
      });
    }
  }
  return stats;
}
