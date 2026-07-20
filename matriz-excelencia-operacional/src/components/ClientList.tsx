import { useState } from "react";
import { ChevronRight, Package } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { getSeverity, severityConfig } from "@/lib/severity";
import type { Cliente, ClienteItem } from "@/data/clients";
import { cn } from "@/lib/utils";

function ItemRow({ item }: { item: ClienteItem }) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-center gap-2 py-2 pl-6 text-sm text-left hover:bg-muted/50 rounded-md transition-colors">
        <ChevronRight
          className={cn(
            "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-90",
          )}
        />
        <span>{item.nombre}</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-14">
        {item.insumos.map((insumo) => (
          <div key={insumo} className="flex items-center gap-2 py-1.5 text-sm text-muted-foreground">
            <Package className="h-3.5 w-3.5 shrink-0" />
            <span>{insumo}</span>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

function ClienteRow({ cliente }: { cliente: Cliente }) {
  const [open, setOpen] = useState(true);
  const severity = getSeverity(cliente.reclamos);
  const config = severityConfig[severity];

  return (
    <div className="border-t first:border-t-0">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger className="flex w-full items-center gap-2 py-3 text-left hover:bg-muted/50 rounded-md transition-colors">
          <ChevronRight
            className={cn(
              "h-4 w-4 shrink-0 transition-transform",
              open && "rotate-90",
            )}
          />
          <span className="font-medium text-sm">{cliente.nombre}</span>
          <span className="text-xs text-muted-foreground">{cliente.pais}</span>
          <Badge
            variant="outline"
            className={cn(
              "ml-auto min-w-[2.5rem] justify-center",
              config.bg,
              config.text,
              config.border,
            )}
          >
            {cliente.reclamos}
          </Badge>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {cliente.items.map((item) => (
            <ItemRow key={item.nombre} item={item} />
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

interface ClientListProps {
  clientes: Cliente[];
}

export function ClientList({ clientes }: ClientListProps) {
  if (clientes.length === 0) {
    return <p className="py-6 text-center text-sm text-muted-foreground">Sin resultados</p>;
  }

  return (
    <>
      {clientes.map((cliente) => (
        <ClienteRow key={cliente.nombre} cliente={cliente} />
      ))}
    </>
  );
}
