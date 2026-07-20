export interface ClienteItem {
  nombre: string;
  insumos: string[];
}

export interface Cliente {
  nombre: string;
  pais: string;
  countryId: string;
  continente: string;
  reclamos: number;
  items: ClienteItem[];
}

export const clientsData: Cliente[] =
[{nombre:"ACME CHILE SPA",pais:"Chile",countryId:"152",continente:"Sudamérica",reclamos:8,items:[{nombre:"FH AS W/ON P 14-16L FI BINS",insumos:["BOLSA BINS 240X260X90MC",'ZUNCHO PLASTICO CERMAQ 1/2"',"ETIQUETA POLIPROPILENO 70X100","HIELO EN ESCAMAS"]}]},{nombre:"ALIMEX S.A.",pais:"Rusia",countryId:"643",continente:"Europa",reclamos:3,items:[{nombre:"FH AS F D PBO P 2-3L FI 35 LB BL",insumos:['ZUNCHO PLASTICO CERMAQ 1/2"',"CAJA TERMICA 35 LB BLANCA","FUNDA PE 100X60CM 28 MICRAS"]},{nombre:"FH AS G/ON P 5-6K FFH 25 KG CQ",insumos:["CAJA EPS 25KG CERMAQ","FUNDA INTERIOR 135X60X28 MIC"]}]},{nombre:"INTEGRA CHILE SPA",pais:"Chile",countryId:"152",continente:"Sudamérica",reclamos:0,items:[{nombre:"FH AS F D PBO P 2-3L FI 35 LB BL",insumos:['ZUNCHO PLASTICO CERMAQ 1/2"',"CAJA TERMICA 35 LB BLANCA","SALAR"]}]},{nombre:"COMERCIAL Y PESQUERA SOUTH WIND S.A.",pais:"Estados Unidos",countryId:"840",continente:"Norteamérica",reclamos:1,items:[{nombre:"FH AS F D PBO P 2-3L FI 35 LB BL",insumos:["GEL PACK 90 GR FROZEN","CINTA EMBALAJE 100MT TRANSPARENTE"]}]},{nombre:"PESCADOS DO BRASIL LTDA",pais:"Brasil",countryId:"076",continente:"Sudamérica",reclamos:5,items:[{nombre:"FH AS G/ON P 10-12K FI CJ",insumos:["CAJA CARTON CORRUGADO 60X40",'ZUNCHO PLASTICO CERMAQ 1/2"',"ETIQUETA POLIPROPILENO 70X100"]}]},{nombre:"NORSK SJOMAT AS",pais:"Noruega",countryId:"578",continente:"Europa",reclamos:0,items:[{nombre:"FH AS W/ON P 8-10L FI BINS",insumos:["BOLSA BINS 240X260X90MC","HIELO EN ESCAMAS"]}]},{nombre:"SHANGHAI OCEAN TRADING CO",pais:"China",countryId:"156",continente:"Asia",reclamos:2,items:[{nombre:"FH AS F D PBO P 3-4L FI 40 LB BL",insumos:["CAJA TERMICA 40 LB BLANCA","GEL PACK 90 GR FROZEN"]}]},{nombre:"CAPE FISHERIES PTY LTD",pais:"Sudáfrica",countryId:"710",continente:"África",reclamos:6,items:[{nombre:"FH AS G/ON P 5-6K FFH 25 KG CQ",insumos:["CAJA EPS 25KG CERMAQ","FUNDA INTERIOR 135X60X28 MIC"]}]},{nombre:"TOKYO MARINE FOODS KK",pais:"Japón",countryId:"392",continente:"Asia",reclamos:1,items:[{nombre:"FH AS W/ON P 14-16L FI BINS",insumos:["BOLSA BINS 240X260X90MC","ETIQUETA POLIPROPILENO 70X100"]}]}];

export const continents: string[] =
["Sudamérica","Norteamérica","Europa","Asia","África"];
