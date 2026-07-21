import { useMemo, useState } from "react";
import { Globe, Package, Search, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WorldMap } from "@/components/WorldMap";
import { StatsCards } from "@/components/StatsCards";
import { ClientList } from "@/components/ClientList";
import { ClientDetail } from "@/components/ClientDetail";
import { clientsData, continents } from "@/data/clients";
import { buildCountryStats } from "@/lib/countryStats";

const countryStats = buildCountryStats(clientsData);

export default function App() {
  const [search, setSearch] = useState("");
  const [continentFilter, setContinentFilter] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCliente, setSelectedCliente] = useState<string | null>(clientsData[0]?.nombre ?? null);

  const activeFilterLabel = useMemo(() => {
    if (selectedCountry) {
      return countryStats.get(selectedCountry)?.pais ?? null;
    }
    return continentFilter !== "all" ? continentFilter : null;
  }, [selectedCountry, continentFilter]);

  const filteredClientes = useMemo(() => {
    return clientsData.filter((cliente) => {
      const term = search.toLowerCase();
      const matchesSearch =
        cliente.nombre.toLowerCase().includes(term) ||
        cliente.pais.toLowerCase().includes(term);
      const matchesCountry = !selectedCountry || cliente.countryId === selectedCountry;
      const matchesContinent = continentFilter === "all" || cliente.continente === continentFilter;
      return matchesSearch && matchesCountry && matchesContinent;
    });
  }, [search, continentFilter, selectedCountry]);

  const clienteSeleccionadoObj = useMemo(() => {
    return (
      filteredClientes.find((c) => c.nombre === selectedCliente) ?? filteredClientes[0] ?? null
    );
  }, [filteredClientes, selectedCliente]);

  const totalItems = useMemo(
    () => clientsData.reduce((sum, cliente) => sum + cliente.items.length, 0),
    [],
  );
  const totalReclamos = useMemo(
    () => clientsData.reduce((sum, cliente) => sum + cliente.reclamos.length, 0),
    [],
  );
  const totalPaises = useMemo(() => new Set(clientsData.map((c) => c.pais)).size, []);

  function clearFilter() {
    setSelectedCountry(null);
    setContinentFilter("all");
  }

  function handleSelectCountry(countryId: string | null) {
    setSelectedCountry(countryId);
    setContinentFilter("all");
    setSelectedCliente(null);
  }

  function handleContinentChange(value: string) {
    setContinentFilter(value);
    setSelectedCountry(null);
    setSelectedCliente(null);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1600px] px-6 py-8">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
            <Package className="h-4 w-4 text-primary" />
          </div>
          <h1 className="text-base font-medium">Matriz Excelencia Operacional</h1>
          <Badge variant="secondary" className="ml-auto font-normal">
            Prototipo
          </Badge>
        </div>

        <StatsCards
          totalClientes={clientsData.length}
          totalPaises={totalPaises}
          totalItems={totalItems}
          totalReclamos={totalReclamos}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-4 items-start">
          <div className="space-y-3">
            <Card className="shadow-none">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 px-1 pb-2 text-xs font-medium text-muted-foreground">
                  <Globe className="h-3.5 w-3.5" />
                  <span>Distribucion geografica</span>
                </div>
                <WorldMap
                  selectedCountry={selectedCountry}
                  onSelectCountry={handleSelectCountry}
                  countryStats={countryStats}
                />
              </CardContent>
            </Card>

            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar cliente o pais..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={continentFilter} onValueChange={handleContinentChange}>
              <SelectTrigger>
                <SelectValue placeholder="Continente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los continentes</SelectItem>
                {continents.map((continente) => (
                  <SelectItem key={continente} value={continente}>
                    {continente}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {activeFilterLabel && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Agrupado por:</span>
                <Badge variant="outline" className="font-normal">
                  {activeFilterLabel}
                </Badge>
                <button
                  onClick={clearFilter}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-3 w-3" />
                  Quitar
                </button>
              </div>
            )}

            <Card className="shadow-none">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 pb-2 mb-1 border-b text-xs font-medium text-muted-foreground">
                  <span className="flex-1">Cliente</span>
                  <span className="w-10 text-center">Reclamos</span>
                </div>
                <div className="max-h-[calc(100vh-24rem)] min-h-[240px] overflow-y-auto">
                  <ClientList
                    clientes={filteredClientes}
                    selectedNombre={clienteSeleccionadoObj?.nombre ?? null}
                    onSelect={setSelectedCliente}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {clienteSeleccionadoObj && <ClientDetail cliente={clienteSeleccionadoObj} />}
        </div>
      </div>
    </div>
  );
}
