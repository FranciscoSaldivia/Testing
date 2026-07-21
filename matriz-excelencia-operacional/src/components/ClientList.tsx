import { Badge } from "@/components/ui/badge";
import { getSeverity, severityConfig } from "@/lib/severity";
import type { Cliente } from "@/data/clients";
import { cn } from "@/lib/utils";

interface ClientListProps {
  clientes: Cliente[];
  selectedNombre: string | null;
  onSelect: (nombre: string) => void;
}

export function ClientList({ clientes, selectedNombre, onSelect }: ClientListProps) {
  if (clientes.length === 0) {
    return <p className="py-6 text-center text-sm text-muted-foreground">Sin resultados</p>;
  }

  return (
    <>
      {clientes.map((cliente) => {
        const severity = getSeverity(cliente.reclamos.length);
        const config = severityConfig[severity];
        const isSelected = cliente.nombre === selectedNombre;

        return (
          <button
            key={cliente.nombre}
            onClick={() => onSelect(cliente.nombre)}
            className={cn(
              "flex w-full items-center gap-2 py-2.5 px-2 text-left rounded-md transition-colors border-t first:border-t-0",
              isSelected ? "bg-muted" : "hover:bg-muted/50",
            )}
          >
            <span className="font-medium text-sm truncate">{cliente.nombre}</span>
            <span className="text-xs text-muted-foreground shrink-0">{cliente.pais}</span>
            <Badge
              variant="outline"
              className={cn("ml-auto min-w-[2.5rem] justify-center shrink-0", config.bg, config.text, config.border)}
            >
              {cliente.reclamos.length}
            </Badge>
          </button>
        );
      })}
    </>
  );
}
