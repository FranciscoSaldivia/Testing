import { useState } from "react";
import { countryPaths } from "@/data/countryPaths";
import { getSeverity, severityConfig } from "@/lib/severity";
import type { CountryStat } from "@/lib/countryStats";

interface WorldMapProps {
  selectedCountry: string | null;
  onSelectCountry: (countryId: string | null) => void;
  countryStats: Map<string, CountryStat>;
}

export function WorldMap({ selectedCountry, onSelectCountry, countryStats }: WorldMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const activeId = hovered ?? selectedCountry;
  const activeStat = activeId ? countryStats.get(activeId) : undefined;

  return (
    <div className="relative w-full overflow-hidden rounded-md bg-muted/30">
      <svg
        viewBox="0 0 960 460"
        className="w-full h-auto"
        role="img"
        aria-label="Mapa mundial con paises agrupados por cliente"
      >
        {countryPaths.map((country) => {
          const stat = country.id ? countryStats.get(country.id) : undefined;
          const isActive =
            !!country.id && (selectedCountry === country.id || hovered === country.id);
          const fill = stat
            ? severityConfig[getSeverity(stat.reclamos)].fillVar
            : "var(--muted-foreground)";
          const fillOpacity = stat ? (isActive ? 0.95 : 0.75) : 0.12;

          return (
            <path
              key={country.id ?? country.name}
              d={country.d}
              fill={fill}
              fillOpacity={fillOpacity}
              stroke="var(--background)"
              strokeWidth={isActive ? 1.2 : 0.5}
              className={stat ? "cursor-pointer transition-all" : undefined}
              onMouseEnter={() => stat && country.id && setHovered(country.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() =>
                stat &&
                country.id &&
                onSelectCountry(selectedCountry === country.id ? null : country.id)
              }
            />
          );
        })}
      </svg>

      {activeStat && (
        <div className="absolute bottom-2 left-2 rounded-md bg-popover border px-2.5 py-1.5 text-xs shadow-sm">
          <span className="font-medium">{activeStat.pais}</span>
          <span className="text-muted-foreground"> — {activeStat.continente}</span>
          <span className="text-muted-foreground">
            {" "}
            · {activeStat.reclamos} reclamo{activeStat.reclamos !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      <div className="absolute top-2 right-2 flex items-center gap-3 rounded-md bg-popover/90 border px-2.5 py-1.5 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
          Sin reclamos
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-amber-500 inline-block" />
          1–3
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-red-500 inline-block" />
          4+
        </span>
      </div>
    </div>
  );
}
