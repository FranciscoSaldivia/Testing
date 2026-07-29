import { useEffect, useRef, useState, type ReactNode } from "react";
import { Bot, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { clientsData } from "@/data/clients";

type MensajeTipo = "usuario" | "asistente";

interface Mensaje {
  tipo: MensajeTipo;
  contenido: ReactNode;
}

const SUGERENCIAS = [
  { clave: "trim", texto: "¿Qué clientes concentran más reclamos por efectividad de trim?" },
  { clave: "costo", texto: "¿Cuál es el costo por kg vendido en cada cliente?" },
  { clave: "volumen", texto: "¿Qué volúmenes totales se planificaron por cliente?" },
  { clave: "critico", texto: "¿Qué clientes tienen reclamos críticos (Claim) activos?" },
];

function Tabla({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <table className="w-full text-xs mt-2 border-collapse">
      <thead>
        <tr className="bg-muted/60">
          {headers.map((h) => (
            <th
              key={h}
              className="text-left font-semibold px-2 py-1.5 uppercase tracking-wide text-[10px] text-muted-foreground"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b last:border-b-0">
            {row.map((cell, j) => (
              <td key={j} className="px-2 py-1.5">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function procesarConsulta(texto: string): ReactNode {
  const consulta = texto.toLowerCase();

  if (consulta.includes("trim")) {
    const filas: ReactNode[][] = [];
    clientsData.forEach((c) => {
      c.reclamos
        .filter((r) => r.tipo.toLowerCase().includes("trim"))
        .forEach((r) => filas.push([c.nombre, c.pais, r.tipo, r.tipoReclamo, r.fecha]));
    });
    if (filas.length === 0) {
      return <p>No hay reclamos de efectividad de trim registrados.</p>;
    }
    const clientesConTrim = new Set(filas.map((f) => f[0])).size;
    return (
      <>
        <p className="font-semibold mb-1">
          {clientesConTrim} cliente(s) concentran {filas.length} reclamo(s) por efectividad de trim.
        </p>
        <Tabla headers={["Cliente", "País", "Reclamo", "Tipo", "Fecha"]} rows={filas} />
      </>
    );
  }

  if (consulta.includes("costo")) {
    const datos = clientsData
      .map((c) => ({
        nombre: c.nombre,
        producto: c.ventas.productoPrincipal,
        costoKg: c.ventas.totalUSD / c.ventas.totalKg,
      }))
      .sort((a, b) => b.costoKg - a.costoKg);
    return (
      <>
        <p className="font-semibold mb-1">
          El valor más alto por kg es {datos[0].nombre} ({datos[0].producto}) con ${datos[0].costoKg.toFixed(2)}/kg.
        </p>
        <Tabla
          headers={["Cliente", "Producto", "USD / kg"]}
          rows={datos.map((d) => [d.nombre, d.producto, `$${d.costoKg.toFixed(2)}`])}
        />
      </>
    );
  }

  if (consulta.includes("volum")) {
    const total = clientsData.reduce((s, c) => s + c.ventas.totalKg, 0);
    const filas: ReactNode[][] = clientsData.map((c) => [
      c.nombre,
      c.pais,
      `${c.ventas.totalKg.toLocaleString("es-CL")} kg`,
      `${((c.ventas.totalKg / total) * 100).toFixed(1)}%`,
    ]);
    filas.push(["TOTAL", "", `${total.toLocaleString("es-CL")} kg`, "100%"]);
    return (
      <>
        <p className="font-semibold mb-1">Volumen total planificado: {total.toLocaleString("es-CL")} kg.</p>
        <Tabla headers={["Cliente", "País", "Volumen", "%"]} rows={filas} />
      </>
    );
  }

  if (consulta.includes("critic") || consulta.includes("claim")) {
    const filas: ReactNode[][] = [];
    clientsData.forEach((c) => {
      c.reclamos
        .filter((r) => r.tipoReclamo === "Claim")
        .forEach((r) => filas.push([c.nombre, c.pais, r.tipo, r.fecha]));
    });
    if (filas.length === 0) {
      return <p>No hay reclamos críticos (Claim) activos.</p>;
    }
    return (
      <>
        <p className="font-semibold mb-1">{filas.length} reclamo(s) críticos (Claim) activos.</p>
        <Tabla headers={["Cliente", "País", "Reclamo", "Fecha"]} rows={filas} />
      </>
    );
  }

  return (
    <p>
      No reconocí esa consulta. Prueba con: <strong>trim</strong>, <strong>costo</strong>, <strong>volumen</strong> o{" "}
      <strong>críticos</strong>.
    </p>
  );
}

export function AssistantChat() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      tipo: "asistente",
      contenido: (
        <p>
          Bienvenido al Asistente de Excelencia Operacional. Puedo cruzar datos de reclamos, costos, volúmenes
          planificados y requerimientos técnicos. Usa las sugerencias de abajo o escribe tu consulta.
        </p>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [mensajes]);

  function enviar(texto: string) {
    const limpio = texto.trim();
    if (!limpio) return;
    setMensajes((prev) => [...prev, { tipo: "usuario", contenido: limpio }]);
    setInput("");
    setTimeout(() => {
      setMensajes((prev) => [...prev, { tipo: "asistente", contenido: procesarConsulta(limpio) }]);
    }, 300);
  }

  return (
    <Card className="shadow-none">
      <CardContent className="p-0 flex flex-col h-[70vh] min-h-[480px]">
        <div className="flex items-center gap-2 px-4 py-3 border-b text-sm font-medium">
          <Bot className="h-4 w-4 text-primary" />
          <span>Asistente de Excelencia Operacional</span>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-muted/20">
          {mensajes.map((m, i) => (
            <div key={i} className={`flex ${m.tipo === "usuario" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.tipo === "usuario"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-card border rounded-bl-sm"
                }`}
              >
                {m.tipo === "asistente" && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                    <Bot className="h-3 w-3" /> Asistente
                  </div>
                )}
                {m.contenido}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 px-4 py-2.5 border-t bg-muted/10">
          {SUGERENCIAS.map((s) => (
            <button
              key={s.clave}
              onClick={() => enviar(s.texto)}
              className="text-xs border rounded-full px-3 py-1.5 hover:border-primary hover:text-primary transition-colors bg-card"
            >
              {s.texto}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 px-4 py-3 border-t">
          <Input
            placeholder="Escribe tu consulta... (ej: 'reclamos por trim')"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") enviar(input);
            }}
          />
          <button
            onClick={() => enviar(input)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
