import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { getSeverity, severityConfig } from "@/lib/severity";
import type { Cliente } from "@/data/clients";
import { cn } from "@/lib/utils";

interface ClientListProps {
  clientes: Cliente[];
  selectedNombre: string | null;
  onSelect: (nombre: string) => void;
}

function groupByContinenteYPais(clientes: Cliente[]) {
  const porContinente = new Map<string, Map<string, Cliente[]>>();
  for (const cliente of clientes) {
    if (!porContinente.has(cliente.continente)) {
      porContinente.set(cliente.continente, new Map());
    }
    const porPais = porContinente.get(cliente.continente)!;
    if (!porPais.has(cliente.pais)) {
      porPais.set(cliente.pais, []);
    }
    porPais.get(cliente.pais)!.push(cliente);
  }
  return porContinente;
}

function ClienteRow({
  cliente,
  isSelected,
  onSelect,
}: {
  cliente: Cliente;
  isSelected: boolean;
  onSelect: (nombre: string) => void;
}) {
  const config = severityConfig[getSeverity(cliente.reclamos.length)];

  return (
    <button
      onClick={() => onSelect(cliente.nombre)}
      className={cn(
        "flex w-full items-center gap-2 py-2 pl-8 pr-2 text-left rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isSelected ? "bg-muted" : "hover:bg-muted/50",
      )}
    >
      <span className="text-sm truncate">{cliente.nombre}</span>
      <Badge
        variant="outline"
        className={cn(
          "ml-auto min-w-[2.5rem] justify-center shrink-0 tabular-nums",
          config.bg,
          config.text,
          config.border,
        )}
      >
        {cliente.reclamos.length}
      </Badge>
    </button>
  );
}

function ContinenteGroup({
  continente,
  paises,
  selectedNombre,
  onSelect,
}: {
  continente: string;
  paises: Map<string, Cliente[]>;
  selectedNombre: string | null;
  onSelect: (nombre: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const clientesContinente = [...paises.values()].flat();
  const totalClientes = clientesContinente.length;
  const totalReclamos = clientesContinente.reduce((sum, c) => sum + c.reclamos.length, 0);
  const config = severityConfig[getSeverity(totalReclamos)];

  return (
    <div className="border-t first:border-t-0">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger className="flex w-full items-center gap-2 py-2.5 px-2 text-left rounded-md transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <ChevronRight
            className={cn("h-4 w-4 shrink-0 transition-transform", open && "rotate-90")}
          />
          <span className="font-semibold text-sm">{continente}</span>
          <span className="text-xs text-muted-foreground">
            {totalClientes} cliente{totalClientes !== 1 ? "s" : ""}
          </span>
          <Badge
            variant="outline"
            className={cn("ml-auto min-w-[2.5rem] justify-center tabular-nums", config.bg, config.text, config.border)}
          >
            {totalReclamos}
          </Badge>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {[...paises.entries()].map(([pais, clientesPais]) => (
            <div key={pais}>
              <p className="pl-4 pt-2 pb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {pais}
              </p>
              {clientesPais.map((cliente) => (
                <ClienteRow
                  key={cliente.nombre}
                  cliente={cliente}
                  isSelected={cliente.nombre === selectedNombre}
                  onSelect={onSelect}
                />
              ))}
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export function ClientList({ clientes, selectedNombre, onSelect }: ClientListProps) {
  if (clientes.length === 0) {
    return <p className="py-6 text-center text-sm text-muted-foreground">Sin resultados</p>;
  }

  const agrupados = groupByContinenteYPais(clientes);

  return (
    <>
      {[...agrupados.entries()].map(([continente, paises]) => (
        <ContinenteGroup
          key={continente}
          continente={continente}
          paises={paises}
          selectedNombre={selectedNombre}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}
