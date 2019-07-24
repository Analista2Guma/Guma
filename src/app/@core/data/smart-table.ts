import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class SmartTableData {

    CAData: Object[] = [
        {
            LABORATORIO: 'Naprod',
            ARTICULO: 10118212,
            DESCRIPCION: 'erlotinib 100 mg Tabletas Recubiertas 10/Caja (Naprod)',
            CLASE_ABC: 'C',
            ORDEN_MINIMA: 'NOT FOUND',
            FACTOR_EMPAQUE: 10,
            BODEGA: 6,
            CANT_DISPONIBLE: 0,
            CANT_PEDIDA: 0,
            CANT_TRANSITO: 0,
            ARTICULO2: 10118212,
            DESCRIPCION3: 'erlotinib 100 mg Tabletas Recubiertas 10/Caja (Naprod)',
            CLASE_ABC_privado: 'Categoria',
            ORDEN_MINIMA_privado: 0,
            FACTOR_EMPAQUE_privado: 10,
            BODEGA_privado: 2,
            CANT_DISPONIBLE_privado: 0,
            CANT_PEDIDA_privado: 0,
            CANT_TRANSITO_privado: 0,
            CONTRATADA: 4.8,
            PENDIENTE: 0,
            ORDENADO: 0,
        },
        {
            LABORATORIO: 'Naprod',
            ARTICULO: 10118251,
            DESCRIPCION: 'Fludarabina Fosfato 50 mg Liofilizado para Sol. iny. Vial 1/Caja Refrigerado (Naprod)',
            CLASE_ABC: 'B',
            ORDEN_MINIMA: 'NOT FOUND',
            FACTOR_EMPAQUE: 1,
            BODEGA: 6,
            CANT_DISPONIBLE: 4,
            CANT_PEDIDA: 0,
            CANT_TRANSITO: 0,
            ARTICULO2: 10118251,
            DESCRIPCION3: 'Fludarabina Fosfato 50 mg Liofilizado para Sol. iny. Vial 1/Caja Refrigerado (Naprod)',
            CLASE_ABC_privado: 'Categoria',
            ORDEN_MINIMA_privado: 0,
            FACTOR_EMPAQUE_privado: 1,
            BODEGA_privado: 2,
            CANT_DISPONIBLE_privado: 77,
            CANT_PEDIDA_privado: 0,
            CANT_TRANSITO_privado: 0,
            CONTRATADA: 72,
            PENDIENTE: 0,
            ORDENADO: 4,
        },
        {
            LABORATORIO: 'Naprod',
            ARTICULO: 10118501,
            DESCRIPCION: 'Vinblastina 10 Mg PPSi  Vial 1/Caja Refrigerado (Naprod)',
            CLASE_ABC: 'C',
            ORDEN_MINIMA: 'NOT FOUND',
            FACTOR_EMPAQUE: 1,
            BODEGA: 6,
            CANT_DISPONIBLE: 4,
            CANT_PEDIDA: 0,
            CANT_TRANSITO: 0,
            ARTICULO2: 10118501,
            DESCRIPCION3: 'Vinblastina 10 Mg PPSi  Vial 1/Caja Refrigerado (Naprod)',
            CLASE_ABC_privado: 'Categoria',
            ORDEN_MINIMA_privado: 0,
            FACTOR_EMPAQUE_privado: 1,
            BODEGA_privado: 2,
            CANT_DISPONIBLE_privado: 0,
            CANT_PEDIDA_privado: 0,
            CANT_TRANSITO_privado: 0,
            CONTRATADA: 126,
            PENDIENTE: 0,
            ORDENADO: 21,
        },
    ];

    getData() {
        return this.CAData;
    }

}
