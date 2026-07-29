import { Card, CardContent } from "@/components/ui/card";

interface StatsCardsProps {
  totalClientes: number;
  totalPaises: number;
  totalItems: number;
  totalReclamos: number;
}

export function StatsCards({
  totalClientes,
  totalPaises,
  totalItems,
  totalReclamos,
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-4 gap-3 mb-6">
      <Card className="border-none bg-muted/50 shadow-none">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground mb-1">Clientes activos</p>
          <p className="text-2xl font-medium">{totalClientes}</p>
        </CardContent>
      </Card>
      <Card className="border-none bg-muted/50 shadow-none">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground mb-1">Paises</p>
          <p className="text-2xl font-medium">{totalPaises}</p>
        </CardContent>
      </Card>
      <Card className="border-none bg-muted/50 shadow-none">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground mb-1">Items distintos</p>
          <p className="text-2xl font-medium">{totalItems}</p>
        </CardContent>
      </Card>
      <Card className="border-none bg-red-50 dark:bg-red-950 shadow-none">
        <CardContent className="p-4">
          <p className="text-xs text-red-700 dark:text-red-300 mb-1">Reclamos totales</p>
          <p className="text-2xl font-medium text-red-700 dark:text-red-300">{totalReclamos}</p>
        </CardContent>
      </Card>
    </div>
  );
}
