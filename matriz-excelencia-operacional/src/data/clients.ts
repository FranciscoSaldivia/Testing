export interface ClienteItem {
  nombre: string;
  insumos: string[];
}

export interface Reclamo {
  tipo: string;
  tipoReclamo: "Claim" | "Complaint";
  fecha: string;
}

export interface Ventas {
  totalKg: number;
  totalUSD: number;
  productoPrincipal: string;
}

export interface FichaTecnica {
  codigo: string;
  requerimientos: string[];
}

export interface Cliente {
  nombre: string;
  pais: string;
  countryId: string;
  continente: string;
  items: ClienteItem[];
  ventas: Ventas;
  fichaTecnica: FichaTecnica;
  reclamos: Reclamo[];
  fotosEmpaque: string[];
}

export const clientsData: Cliente[] = [
  {
    nombre: "Distribuidora Austral S.A.",
    pais: "Chile",
    countryId: "152",
    continente: "Sudamérica",
    items: [
      {
        nombre: "FH AS W/ON P 14-16L FI BINS",
        insumos: ["BOLSA BINS 240X260X90MC", 'ZUNCHO PLASTICO CERMAQ 1/2"', "ETIQUETA POLIPROPILENO 70X100", "HIELO EN ESCAMAS"],
      },
    ],
    ventas: { totalKg: 185000, totalUSD: 742000, productoPrincipal: "Salmón entero WFE" },
    fichaTecnica: { codigo: "FT-SA-0101", requerimientos: ["Sin melanosis", "No hematomas", "Calibre 14-16 Lbs"] },
    reclamos: [
      { tipo: "Pérdida de vacío en proceso", tipoReclamo: "Claim", fecha: "2026-01-14" },
      { tipo: "Efectividad de trim", tipoReclamo: "Complaint", fecha: "2026-02-02" },
      { tipo: "Humedad en caja máster", tipoReclamo: "Complaint", fecha: "2026-02-20" },
      { tipo: "Melanosis superior a tolerancia", tipoReclamo: "Claim", fecha: "2026-03-11" },
      { tipo: "Calibre fuera de especificación", tipoReclamo: "Complaint", fecha: "2026-04-05" },
      { tipo: "Hematomas visibles", tipoReclamo: "Complaint", fecha: "2026-05-09" },
      { tipo: "Daño en transporte", tipoReclamo: "Claim", fecha: "2026-06-01" },
      { tipo: "Etiquetado incorrecto", tipoReclamo: "Complaint", fecha: "2026-06-28" },
    ],
    fotosEmpaque: ["Caja máster cerrada", "Pallet paletizado", "Etiqueta aplicada", "Detalle interior de empaque"],
  },
  {
    nombre: "Nordic Trading Import LLC",
    pais: "Rusia",
    countryId: "643",
    continente: "Europa",
    items: [
      {
        nombre: "FH AS F D PBO P 2-3L FI 35 LB BL",
        insumos: ['ZUNCHO PLASTICO CERMAQ 1/2"', "CAJA TERMICA 35 LB BLANCA", "FUNDA PE 100X60CM 28 MICRAS"],
      },
      {
        nombre: "FH AS G/ON P 5-6K FFH 25 KG CQ",
        insumos: ["CAJA EPS 25KG CERMAQ", "FUNDA INTERIOR 135X60X28 MIC"],
      },
    ],
    ventas: { totalKg: 96500, totalUSD: 415000, productoPrincipal: "Porciones HON congelado" },
    fichaTecnica: { codigo: "FT-SA-0102", requerimientos: ["Sin piel", "Con escamas", "Sin melanosis"] },
    reclamos: [
      { tipo: "Efectividad de trim", tipoReclamo: "Complaint", fecha: "2026-03-04" },
      { tipo: "Pérdida de vacío en proceso", tipoReclamo: "Claim", fecha: "2026-04-18" },
      { tipo: "Humedad en caja máster", tipoReclamo: "Complaint", fecha: "2026-05-22" },
    ],
    fotosEmpaque: ["Caja máster cerrada", "Pallet paletizado", "Etiqueta aplicada", "Detalle interior de empaque"],
  },
  {
    nombre: "Comercializadora Andina Ltda.",
    pais: "Chile",
    countryId: "152",
    continente: "Sudamérica",
    items: [
      {
        nombre: "FH AS F D PBO P 2-3L FI 35 LB BL",
        insumos: ['ZUNCHO PLASTICO CERMAQ 1/2"', "CAJA TERMICA 35 LB BLANCA", "SALAR"],
      },
    ],
    ventas: { totalKg: 54000, totalUSD: 198000, productoPrincipal: "Porciones frescas" },
    fichaTecnica: { codigo: "FT-SA-0103", requerimientos: ["Despinado manual", "Sin melanosis", "No hematomas"] },
    reclamos: [],
    fotosEmpaque: ["Caja máster cerrada", "Pallet paletizado", "Etiqueta aplicada", "Detalle interior de empaque"],
  },
  {
    nombre: "Blue Ocean Seafood Corp.",
    pais: "Estados Unidos",
    countryId: "840",
    continente: "Norteamérica",
    items: [
      {
        nombre: "FH AS F D PBO P 2-3L FI 35 LB BL",
        insumos: ["GEL PACK 90 GR FROZEN", "CINTA EMBALAJE 100MT TRANSPARENTE"],
      },
    ],
    ventas: { totalKg: 128000, totalUSD: 512000, productoPrincipal: "Porciones frescas" },
    fichaTecnica: { codigo: "FT-SA-0104", requerimientos: ["Despinado manual", "Sin melanosis", "No hematomas"] },
    reclamos: [{ tipo: "Daño en transporte", tipoReclamo: "Complaint", fecha: "2026-05-02" }],
    fotosEmpaque: ["Caja máster cerrada", "Pallet paletizado", "Etiqueta aplicada", "Detalle interior de empaque"],
  },
  {
    nombre: "Atlântico Sul Importadora Ltda.",
    pais: "Brasil",
    countryId: "076",
    continente: "Sudamérica",
    items: [
      {
        nombre: "FH AS G/ON P 10-12K FI CJ",
        insumos: ["CAJA CARTON CORRUGADO 60X40", 'ZUNCHO PLASTICO CERMAQ 1/2"', "ETIQUETA POLIPROPILENO 70X100"],
      },
    ],
    ventas: { totalKg: 210000, totalUSD: 780000, productoPrincipal: "Salmón entero G/ON" },
    fichaTecnica: { codigo: "FT-SA-0105", requerimientos: ["Con melanosis máximo 2.5 cm", "Con escamas", "No hematomas"] },
    reclamos: [
      { tipo: "Pérdida de vacío en proceso", tipoReclamo: "Claim", fecha: "2026-02-10" },
      { tipo: "Efectividad de trim", tipoReclamo: "Complaint", fecha: "2026-03-15" },
      { tipo: "Melanosis superior a tolerancia", tipoReclamo: "Claim", fecha: "2026-04-01" },
      { tipo: "Etiquetado incorrecto", tipoReclamo: "Complaint", fecha: "2026-05-19" },
      { tipo: "Hematomas visibles", tipoReclamo: "Complaint", fecha: "2026-06-23" },
    ],
    fotosEmpaque: ["Caja máster cerrada", "Pallet paletizado", "Etiqueta aplicada", "Detalle interior de empaque"],
  },
  {
    nombre: "Fjord Seafood Partners AS",
    pais: "Noruega",
    countryId: "578",
    continente: "Europa",
    items: [
      {
        nombre: "FH AS W/ON P 8-10L FI BINS",
        insumos: ["BOLSA BINS 240X260X90MC", "HIELO EN ESCAMAS"],
      },
    ],
    ventas: { totalKg: 88000, totalUSD: 350000, productoPrincipal: "Salmón entero W/ON" },
    fichaTecnica: { codigo: "FT-SA-0106", requerimientos: ["Sin melanosis", "No hematomas", "Calibre 8-10 Lbs"] },
    reclamos: [],
    fotosEmpaque: ["Caja máster cerrada", "Pallet paletizado", "Etiqueta aplicada", "Detalle interior de empaque"],
  },
  {
    nombre: "Golden Harbor Trading Co.",
    pais: "China",
    countryId: "156",
    continente: "Asia",
    items: [
      {
        nombre: "FH AS F D PBO P 3-4L FI 40 LB BL",
        insumos: ["CAJA TERMICA 40 LB BLANCA", "GEL PACK 90 GR FROZEN"],
      },
    ],
    ventas: { totalKg: 142000, totalUSD: 560000, productoPrincipal: "Porciones congeladas" },
    fichaTecnica: { codigo: "FT-SA-0107", requerimientos: ["Despinado manual", "Sin melanosis", "Calibre 3-4 Lbs"] },
    reclamos: [
      { tipo: "Calibre fuera de especificación", tipoReclamo: "Complaint", fecha: "2026-03-28" },
      { tipo: "Daño en transporte", tipoReclamo: "Claim", fecha: "2026-05-14" },
    ],
    fotosEmpaque: ["Caja máster cerrada", "Pallet paletizado", "Etiqueta aplicada", "Detalle interior de empaque"],
  },
  {
    nombre: "Southern Cape Foods Pty Ltd",
    pais: "Sudáfrica",
    countryId: "710",
    continente: "África",
    items: [
      {
        nombre: "FH AS G/ON P 5-6K FFH 25 KG CQ",
        insumos: ["CAJA EPS 25KG CERMAQ", "FUNDA INTERIOR 135X60X28 MIC"],
      },
    ],
    ventas: { totalKg: 76000, totalUSD: 290000, productoPrincipal: "Salmón G/ON congelado" },
    fichaTecnica: { codigo: "FT-SA-0108", requerimientos: ["Con melanosis máximo 2.5 cm", "Con escamas", "No hematomas"] },
    reclamos: [
      { tipo: "Pérdida de vacío en proceso", tipoReclamo: "Claim", fecha: "2026-01-20" },
      { tipo: "Humedad en caja máster", tipoReclamo: "Complaint", fecha: "2026-02-17" },
      { tipo: "Melanosis superior a tolerancia", tipoReclamo: "Claim", fecha: "2026-03-25" },
      { tipo: "Efectividad de trim", tipoReclamo: "Complaint", fecha: "2026-04-30" },
      { tipo: "Hematomas visibles", tipoReclamo: "Complaint", fecha: "2026-06-05" },
      { tipo: "Etiquetado incorrecto", tipoReclamo: "Claim", fecha: "2026-06-27" },
    ],
    fotosEmpaque: ["Caja máster cerrada", "Pallet paletizado", "Etiqueta aplicada", "Detalle interior de empaque"],
  },
  {
    nombre: "Rising Sun Import KK",
    pais: "Japón",
    countryId: "392",
    continente: "Asia",
    items: [
      {
        nombre: "FH AS W/ON P 14-16L FI BINS",
        insumos: ["BOLSA BINS 240X260X90MC", "ETIQUETA POLIPROPILENO 70X100"],
      },
    ],
    ventas: { totalKg: 63000, totalUSD: 265000, productoPrincipal: "Salmón entero W/ON" },
    fichaTecnica: { codigo: "FT-SA-0109", requerimientos: ["Sin piel", "Con escamas", "Sin melanosis"] },
    reclamos: [{ tipo: "Efectividad de trim", tipoReclamo: "Complaint", fecha: "2026-04-11" }],
    fotosEmpaque: ["Caja máster cerrada", "Pallet paletizado", "Etiqueta aplicada", "Detalle interior de empaque"],
  },
];

export const continents: string[] = ["Sudamérica", "Norteamérica", "Europa", "Asia", "África"];
