import { useEffect, useMemo, useState } from "react";
import { Globe, Moon, Package, Search, SearchX, Sun, X } from "lucide-react";
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
import { ClientList } from "@/components/ClientList";
import { ClientDetail } from "@/components/ClientDetail";
import { AssistantChat } from "@/components/AssistantChat";
import { clientsData, continents } from "@/data/clients";
import { buildCountryStats } from "@/lib/countryStats";
import { cn } from "@/lib/utils";

const countryStats = buildCountryStats(clientsData);

const countryOptions = (() => {
  const seen = new Map<string, string>();
  for (const cliente of clientsData) {
    if (!seen.has(cliente.countryId)) seen.set(cliente.countryId, cliente.pais);
  }
  return [...seen.entries()]
    .map(([countryId, pais]) => ({ countryId, pais }))
    .sort((a, b) => a.pais.localeCompare(b.pais));
})();

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const [activeTab, setActiveTab] = useState<"catalogo" | "asistente">("catalogo");
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
    () => filteredClientes.reduce((sum, cliente) => sum + cliente.items.length, 0),
    [filteredClientes],
  );
  const totalReclamos = useMemo(
    () => filteredClientes.reduce((sum, cliente) => sum + cliente.reclamos.length, 0),
    [filteredClientes],
  );
  const totalPaises = useMemo(
    () => new Set(filteredClientes.map((c) => c.pais)).size,
    [filteredClientes],
  );

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

  function handleCountryFilterChange(value: string) {
    setSelectedCountry(value === "all" ? null : value);
    setContinentFilter("all");
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
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label={darkMode ? "Activar modo claro" : "Activar modo oscuro"}
            className="flex h-8 w-8 items-center justify-center rounded-md border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        <div className="flex gap-1 mb-6 border-b">
          <button
            onClick={() => setActiveTab("catalogo")}
            className={cn(
              "px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors rounded-t-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              activeTab === "catalogo"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            Catálogo de Clientes
          </button>
          <button
            onClick={() => setActiveTab("asistente")}
            className={cn(
              "px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors rounded-t-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              activeTab === "asistente"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            Asistente de Análisis
          </button>
        </div>

        {activeTab === "asistente" && <AssistantChat />}

        {activeTab === "catalogo" && (
          <>
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pb-3 mb-3 border-b">
                  <h2 className="text-sm font-semibold">Catálogo de Clientes</h2>
                  <span className="flex items-center gap-1.5 text-xs">
                    <span className="text-muted-foreground">Clientes</span>
                    <span className="font-semibold tabular-nums">{filteredClientes.length}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-xs">
                    <span className="text-muted-foreground">Países</span>
                    <span className="font-semibold tabular-nums">{totalPaises}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-xs">
                    <span className="text-muted-foreground">Items</span>
                    <span className="font-semibold tabular-nums">{totalItems}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-xs">
                    <span className="text-red-700 dark:text-red-300">Reclamos</span>
                    <span className="font-semibold tabular-nums text-red-700 dark:text-red-300">
                      {totalReclamos}
                    </span>
                  </span>
                </div>

                <div className="flex gap-2 mb-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar cliente o pais..."
                      className="pl-8"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <Select value={continentFilter} onValueChange={handleContinentChange}>
                    <SelectTrigger className="w-[200px]">
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
                  <Select value={selectedCountry ?? "all"} onValueChange={handleCountryFilterChange}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="País" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los países</SelectItem>
                      {countryOptions.map(({ countryId, pais }) => (
                        <SelectItem key={countryId} value={countryId}>
                          {pais}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {activeFilterLabel && (
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <span className="text-muted-foreground">Agrupado por:</span>
                    <Badge variant="outline" className="font-normal">
                      {activeFilterLabel}
                    </Badge>
                    <button
                      onClick={clearFilter}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <X className="h-3 w-3" />
                      Quitar
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-2 px-2 pb-2 mb-1 border-b text-xs font-medium text-muted-foreground">
                  <span className="flex-1">Continente / País / Cliente</span>
                  <span className="w-14 shrink-0 text-right">Reclamos</span>
                </div>
                <ClientList
                  clientes={filteredClientes}
                  selectedNombre={clienteSeleccionadoObj?.nombre ?? null}
                  onSelect={setSelectedCliente}
                />
              </CardContent>
            </Card>

            {clienteSeleccionadoObj ? (
              <div className="mb-4">
                <ClientDetail cliente={clienteSeleccionadoObj} />
              </div>
            ) : (
              <Card className="mb-4">
                <CardContent className="p-10 flex flex-col items-center text-center gap-2">
                  <SearchX className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm font-medium">Ningún cliente coincide con el filtro</p>
                  <p className="text-xs text-muted-foreground">
                    Prueba con otro término de búsqueda o quita el filtro de continente/país activo.
                  </p>
                </CardContent>
              </Card>
            )}

            <Card className="max-w-3xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 px-1 pb-2 text-xs font-medium text-muted-foreground">
                  <Globe className="h-3.5 w-3.5" />
                  <span>Distribucion geografica de clientes</span>
                  <span className="ml-auto text-[11px] font-normal">
                    Clic en un pais para agrupar
                  </span>
                </div>
                <WorldMap
                  selectedCountry={selectedCountry}
                  onSelectCountry={handleSelectCountry}
                  countryStats={countryStats}
                />
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
