import { useState, type CSSProperties, type ReactNode } from "react";
import { AlertTriangle, Camera, FileText, Package, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { ImageModal } from "@/components/ImageModal";
import { cn } from "@/lib/utils";
import type { Cliente } from "@/data/clients";

const kgFormatter = new Intl.NumberFormat("es-CL");
const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wide text-primary">
          {icon}
          <span>{title}</span>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

function Fila({ etiqueta, valor, destacado }: { etiqueta: string; valor: string; destacado?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm border-b last:border-b-0">
      <span className="text-muted-foreground">{etiqueta}</span>
      <span className={cn("tabular-nums", destacado ? "font-semibold text-primary" : "font-medium")}>
        {valor}
      </span>
    </div>
  );
}

export function ClientDetail({ cliente }: { cliente: Cliente }) {
  const [fichaModalOpen, setFichaModalOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ src?: string; label: string } | null>(null);

  const tema = cliente.tema;
  const temaStyle: CSSProperties | undefined = tema
    ? ({
        "--primary": tema.primary,
        "--primary-foreground": tema.primaryForeground,
        "--background": tema.background,
        "--foreground": tema.foreground,
        "--card": tema.card,
        "--card-foreground": tema.foreground,
        "--secondary": tema.muted,
        "--secondary-foreground": tema.foreground,
        "--border": tema.border,
        "--muted": tema.muted,
        "--muted-foreground": tema.mutedForeground,
        "--ring": tema.primary,
      } as unknown as CSSProperties)
    : undefined;

  const fotoFichaTecnica = cliente.imagenes?.fichaTecnica;
  const fotosEmpaqueReales = cliente.imagenes?.empaque;

  return (
    <div
      className={cn(
        "space-y-3",
        tema && "rounded-xl border-2 border-primary/40 p-4 bg-background transition-colors",
      )}
      style={temaStyle}
    >
      {tema && <div className="-mt-4 -mx-4 mb-1 h-1.5 rounded-t-lg bg-primary" />}
      <div className="flex items-center gap-2 flex-wrap">
        <h2 className={cn("text-base font-semibold", tema && "uppercase tracking-wider text-primary")}>
          {cliente.nombre}
        </h2>
        <Badge variant="outline" className="font-normal">
          {cliente.pais}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        <SectionCard icon={<TrendingUp className="h-3.5 w-3.5" />} title="Resumen Comercial">
          <Fila etiqueta="Producto vendido" valor={cliente.ventas.productoPrincipal} destacado />
          <Fila etiqueta="Volumen total" valor={`${kgFormatter.format(cliente.ventas.totalKg)} kg`} />
          <Fila etiqueta="Ventas totales" valor={usdFormatter.format(cliente.ventas.totalUSD)} destacado />
          <Fila etiqueta="Mercado destino" valor={cliente.pais} />
        </SectionCard>

        <SectionCard icon={<FileText className="h-3.5 w-3.5" />} title="Ficha Técnica">
          <Fila etiqueta="Código" valor={cliente.fichaTecnica.codigo} />
          <div className="pt-2">
            <p className="text-xs font-medium text-muted-foreground mb-1.5">Requerimientos técnicos</p>
            <ul className="space-y-1 text-sm">
              {cliente.fichaTecnica.requerimientos.map((req) => (
                <li key={req} className="flex items-start gap-1.5">
                  <span className="text-primary">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => setFichaModalOpen(true)}
            className="mt-3 text-xs font-medium text-primary underline underline-offset-2 hover:text-primary/80 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {fotoFichaTecnica?.toLowerCase().endsWith(".pdf") ? "Ver ficha técnica (PDF)" : "Ver foto de ficha técnica"}
          </button>
        </SectionCard>

        <SectionCard icon={<Package className="h-3.5 w-3.5" />} title="Empaque">
          <div className="space-y-3">
            {cliente.items.map((item) => (
              <div key={item.nombre}>
                <p className="text-sm font-medium mb-1">{item.nombre}</p>
                <ul className="space-y-1 pl-3">
                  {item.insumos.map((insumo) => (
                    <li key={insumo} className="text-xs text-muted-foreground">
                      {insumo}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard icon={<AlertTriangle className="h-3.5 w-3.5" />} title="Reclamos">
          {cliente.reclamos.length === 0 ? (
            <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">Sin reclamos</p>
          ) : (
            <div className="space-y-2">
              {cliente.reclamos.map((r, i) => (
                <div key={`${r.tipo}-${i}`} className="flex items-start justify-between gap-2 py-1.5 border-b last:border-b-0 text-sm">
                  <div>
                    <p>{r.tipo}</p>
                    <p className="text-xs text-muted-foreground">{r.fecha}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      r.tipoReclamo === "Claim"
                        ? "text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-900"
                        : "text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-900"
                    }
                  >
                    {r.tipoReclamo}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        <SectionCard icon={<Camera className="h-3.5 w-3.5" />} title="Fotos de Empaque PT">
          <div className="grid grid-cols-2 gap-2">
            {fotosEmpaqueReales
              ? fotosEmpaqueReales.map((src, i) => {
                  const label = cliente.fotosEmpaque[i] ?? "Foto de empaque";
                  return (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setLightbox({ src, label })}
                      className="group overflow-hidden rounded-md border cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <img
                        src={src}
                        alt={label}
                        className="h-24 w-full object-cover transition-transform duration-200 group-hover:scale-110"
                      />
                    </button>
                  );
                })
              : cliente.fotosEmpaque.map((foto) => (
                  <button
                    key={foto}
                    type="button"
                    onClick={() => setLightbox({ label: foto })}
                    className="group overflow-hidden rounded-md cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <PlaceholderImage
                      label={foto}
                      className="h-24 transition-transform duration-200 group-hover:scale-110"
                    />
                  </button>
                ))}
          </div>
        </SectionCard>
      </div>

      <ImageModal
        open={fichaModalOpen}
        label={`Ficha técnica ${cliente.fichaTecnica.codigo}`}
        src={fotoFichaTecnica}
        onClose={() => setFichaModalOpen(false)}
      />

      <ImageModal
        open={lightbox !== null}
        label={lightbox?.label ?? ""}
        src={lightbox?.src}
        onClose={() => setLightbox(null)}
      />
    </div>
  );
}
