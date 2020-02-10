import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of as ObservableOf, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
export class SmartTableData {
    CAContractData = [
    {
      ARTICULO: 18817041,
      CATEGORIA: 'C',
      CONTRATADA: '4,300',
      PENDIENTE: '2,700',
      ORDENADO: '2,700',
    },
    {
      ARTICULO: 13408012,
      CATEGORIA: 'C',
      CONTRATADA: '89,580',
      PENDIENTE: '83,000',
      ORDENADO: '83,000',
    },
    {
      ARTICULO: 18823011,
      CATEGORIA: 'B',
      CONTRATADA: '15,015',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10510022,
      CATEGORIA: 'B',
      CONTRATADA: '600,000',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 15015011,
      CATEGORIA: 'B',
      CONTRATADA: '1,455,790',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 13401083,
      CATEGORIA: 'A',
      CONTRATADA: '879,790',
      PENDIENTE: '362,200',
      ORDENADO: '362,200',
    },
    {
      ARTICULO: 15010011,
      CATEGORIA: 'B',
      CONTRATADA: '147,066',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 15010081,
      CATEGORIA: 'B',
      CONTRATADA: '793,330',
      PENDIENTE: '421,500',
      ORDENADO: '421,500',
    },
    {
      ARTICULO: 15010031,
      CATEGORIA: 'C',
      CONTRATADA: '990,742',
      PENDIENTE: '518,900',
      ORDENADO: '518,900',
    },
    {
      ARTICULO: 18805061,
      CATEGORIA: 'A+',
      CONTRATADA: '24,283',
      PENDIENTE: '13,900',
      ORDENADO: '13,900',
    },
    {
      ARTICULO: 13705061,
      CATEGORIA: 'C',
      CONTRATADA: '364,910',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 13705014,
      CATEGORIA: 'C',
      CONTRATADA: '26,219',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 13410023,
      CATEGORIA: 'C',
      CONTRATADA: '864,690',
      PENDIENTE: '115,800',
      ORDENADO: '115,800',
    },
    {
      ARTICULO: 17303031,
      CATEGORIA: 'A',
      CONTRATADA: '26,302',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 13705052,
      CATEGORIA: 'C',
      CONTRATADA: '81,022',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 13705044,
      CATEGORIA: 'C',
      CONTRATADA: '20,000',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 17303041,
      CATEGORIA: 'B',
      CONTRATADA: '15,000',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 17303042,
      CATEGORIA: 'B',
      CONTRATADA: '15,000',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 13423021,
      CATEGORIA: 'A+',
      CONTRATADA: '3,008,950',
      PENDIENTE: '1,088,100',
      ORDENADO: '1,088,100',
    },
    {
      ARTICULO: 13423012,
      CATEGORIA: 'C',
      CONTRATADA: '1,742,263',
      PENDIENTE: '737,000',
      ORDENADO: '737,000',
    },
    {
      ARTICULO: 13705072,
      CATEGORIA: 'C',
      CONTRATADA: '33,852',
      PENDIENTE: '19,800',
      ORDENADO: '19,800',
    },
    {
      ARTICULO: 13705022,
      CATEGORIA: 'B',
      CONTRATADA: '20,000',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 13705103,
      CATEGORIA: 'A',
      CONTRATADA: '35,000',
      PENDIENTE: '98,600',
      ORDENADO: '98,600',
    },
    {
      ARTICULO: 13805031,
      CATEGORIA: 'C',
      CONTRATADA: '4,000',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 15205011,
      CATEGORIA: 'A',
      CONTRATADA: '61,417',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 19205022,
      CATEGORIA: 'B',
      CONTRATADA: '28,332',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 13705131,
      CATEGORIA: 'C',
      CONTRATADA: '10,250',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 15023021,
      CATEGORIA: 'C',
      CONTRATADA: '1,000',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 19231011,
      CATEGORIA: 'C',
      CONTRATADA: '90,000',
      PENDIENTE: '4,500',
      ORDENADO: '4,500',
    },
    {
      ARTICULO: 15001013,
      CATEGORIA: 'C',
      CONTRATADA: '170,000',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 15004021,
      CATEGORIA: 'B',
      CONTRATADA: '23,000',
      PENDIENTE: '14,900',
      ORDENADO: '14,900',
    },
    {
      ARTICULO: 10510012,
      CATEGORIA: 'C',
      CONTRATADA: '163,500',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 15013011,
      CATEGORIA: 'B',
      CONTRATADA: '104,396',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 15010071,
      CATEGORIA: 'B',
      CONTRATADA: '868,750',
      PENDIENTE: '348,400',
      ORDENADO: '348,400',
    },
    {
      ARTICULO: 15001033,
      CATEGORIA: 'A',
      CONTRATADA: '213,044',
      PENDIENTE: '343,500',
      ORDENADO: '343,500',
    },
    {
      ARTICULO: 10415012,
      CATEGORIA: 'A+',
      CONTRATADA: '31,770',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 18801011,
      CATEGORIA: 'A+',
      CONTRATADA: '500,000',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 15010101,
      CATEGORIA: 'B',
      CONTRATADA: '40,000',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 18810041,
      CATEGORIA: 'A+',
      CONTRATADA: '426,370',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 18825011,
      CATEGORIA: 'C',
      CONTRATADA: '900,251',
      PENDIENTE: '109,380',
      ORDENADO: '109,380',
    },
    {
      ARTICULO: 18806032,
      CATEGORIA: 'A',
      CONTRATADA: '326,530',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 15022011,
      CATEGORIA: 'C',
      CONTRATADA: '64,793',
      PENDIENTE: '35,200',
      ORDENADO: '35,200',
    },
    {
      ARTICULO: 18822011,
      CATEGORIA: 'C',
      CONTRATADA: '937,245',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10506042,
      CATEGORIA: 'A+',
      CONTRATADA: '454,285',
      PENDIENTE: '168,900',
      ORDENADO: '168,900',
    },
    {
      ARTICULO: 15016023,
      CATEGORIA: 'A+',
      CONTRATADA: '1,990,630',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 15005041,
      CATEGORIA: 'C',
      CONTRATADA: '41,795',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 15012011,
      CATEGORIA: 'C',
      CONTRATADA: '8,945',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 15012021,
      CATEGORIA: 'C',
      CONTRATADA: '23,020',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10415013,
      CATEGORIA: 'A+',
      CONTRATADA: '133,996',
      PENDIENTE: '31,400',
      ORDENADO: '31,400',
    },
    {
      ARTICULO: 14112011,
      CATEGORIA: 'C',
      CONTRATADA: '8,900',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 11615011,
      CATEGORIA: 'A+',
      CONTRATADA: '13,635',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 13705161,
      CATEGORIA: 'A+',
      CONTRATADA: '21,940',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10506022,
      CATEGORIA: 'C',
      CONTRATADA: '38,650',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 17212011,
      CATEGORIA: 'A+',
      CONTRATADA: '26,607',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 17212021,
      CATEGORIA: 'A+',
      CONTRATADA: '140,512',
      PENDIENTE: '4,000',
      ORDENADO: '4,000',
    },
    {
      ARTICULO: 19311012,
      CATEGORIA: 'B',
      CONTRATADA: '26,748',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 13213051,
      CATEGORIA: 'C',
      CONTRATADA: '2,488',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 15119011,
      CATEGORIA: 'A+',
      CONTRATADA: '27,824',
      PENDIENTE: '2,580',
      ORDENADO: '2,580',
    },
    {
      ARTICULO: 18824012,
      CATEGORIA: 'A+',
      CONTRATADA: '303,060',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 19205011,
      CATEGORIA: 'A',
      CONTRATADA: '10,555',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 13614012,
      CATEGORIA: 'B',
      CONTRATADA: '30,000',
      PENDIENTE: '15,500',
      ORDENADO: '15,500',
    },
    {
      ARTICULO: 13705122,
      CATEGORIA: 'A+',
      CONTRATADA: '40,013',
      PENDIENTE: '22,020',
      ORDENADO: '22,020',
    },
    {
      ARTICULO: 13705125,
      CATEGORIA: 'A+',
      CONTRATADA: '40,013',
      PENDIENTE: '22,020',
      ORDENADO: '22,020',
    },
    {
      ARTICULO: 15013013,
      CATEGORIA: 'A+',
      CONTRATADA: '111,401',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 13413013,
      CONTRATADA: '1,500,000',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 15208012,
      CONTRATADA: '23,000',
      PENDIENTE: '7,200',
      ORDENADO: '7,200',
    },
    {
      ARTICULO: 15023014,
      CONTRATADA: '2,489,850',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 18810011,
      CONTRATADA: '394,082',
      PENDIENTE: '301,200',
      ORDENADO: '301,200',
    },
    {
      ARTICULO: 18810031,
      CONTRATADA: '3,300,670',
      PENDIENTE: '2,293,470',
      ORDENADO: '2,293,470',
    },
    {
      ARTICULO: 18810032,
      CONTRATADA: '3,300,670',
      PENDIENTE: '2,293,470',
      ORDENADO: '2,293,470',
    },
    {
      ARTICULO: 18805031,
      CONTRATADA: '1,000',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 13713013,
      CONTRATADA: '50,000',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 19414012,
      CONTRATADA: '41,597',
      PENDIENTE: '5,500',
      ORDENADO: '5,500',
    },
    {
      ARTICULO: 18806041,
      CONTRATADA: '54,375',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 17402012,
      CONTRATADA: '12,035',
      PENDIENTE: '7,500',
      ORDENADO: '7,500',
    },
    {
      ARTICULO: 15013031,
      CONTRATADA: '160,040',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 15013023,
      CONTRATADA: '1,149,247',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 17303011,
      CONTRATADA: '6,928',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10520031,
      CONTRATADA: '479,798',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10520012,
      CONTRATADA: '479,798',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 15016012,
      CONTRATADA: '671,164',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: '-',
      CONTRATADA: '1,920,000',
      PENDIENTE: '959,300',
      ORDENADO: '959,300',
    },
    {
      ARTICULO: 18803011,
      CONTRATADA: '14,596',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 18807011,
      CONTRATADA: '1,623',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 13619011,
      CONTRATADA: '17,501',
      PENDIENTE: '3,600',
      ORDENADO: '3,600',
    },
    {
      ARTICULO: 13625011,
      CONTRATADA: '5,100',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 18806011,
      CONTRATADA: '76,594',
      PENDIENTE: '68,320',
      ORDENADO: '68,320',
    },
    {
      ARTICULO: 13401062,
      CONTRATADA: '1,916,464',
      PENDIENTE: '698,200',
      ORDENADO: '698,200',
    },
    {
      ARTICULO: 18824031,
      CONTRATADA: '45,045',
      PENDIENTE: '4,200',
      ORDENADO: '4,200',
    },
    {
      ARTICULO: 13710011,
      CONTRATADA: '345,067',
      PENDIENTE: '583,800',
      ORDENADO: '583,800',
    },
    {
      ARTICULO: 15010063,
      CONTRATADA: '45,336',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 15010083,
      CONTRATADA: '17,213',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10105011,
      CONTRATADA: '50,000',
      PENDIENTE: '22,500',
      ORDENADO: '22,500',
    },
    {
      ARTICULO: 11423014,
      CONTRATADA: '633,955',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: '',
      CONTRATADA: '21,896',
      PENDIENTE: '8,300',
      ORDENADO: '8,300',
    },
    {
      ARTICULO: 15020011,
      CONTRATADA: '40,400',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10417011,
      CONTRATADA: '20,500',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 15220011,
      CONTRATADA: '1,576',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 13820011,
      CONTRATADA: '',
      PENDIENTE: '24,000',
      ORDENADO: '24,000',
    },
    {
      ARTICULO: 10118531,
      CONTRATADA: '34,980',
      PENDIENTE: '5,760',
      ORDENADO: '5,760',
    },
    {
      ARTICULO: 10118011,
      CONTRATADA: 978,
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10118022,
      CONTRATADA: '46,324',
      PENDIENTE: '20,020',
      ORDENADO: '20,020',
    },
    {
      ARTICULO: 10118081,
      CONTRATADA: '128,768',
      PENDIENTE: '47,000',
      ORDENADO: '47,000',
    },
    {
      ARTICULO: 10118041,
      CONTRATADA: 399,
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10118051,
      CONTRATADA: 255,
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10118062,
      CONTRATADA: '78,110',
      PENDIENTE: '20,000',
      ORDENADO: '20,000',
    },
    {
      ARTICULO: 10118072,
      CONTRATADA: '2,415',
      PENDIENTE: '1,000',
      ORDENADO: '1,000',
    },
    {
      ARTICULO: 10118101,
      CONTRATADA: 827,
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10118111,
      CONTRATADA: 698,
      PENDIENTE: 216,
      ORDENADO: 216,
    },
    {
      ARTICULO: 10118121,
      CONTRATADA: '5,476',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10118131,
      CONTRATADA: 416,
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10118161,
      CONTRATADA: '1,251',
      PENDIENTE: 136,
      ORDENADO: 136,
    },
    {
      ARTICULO: 10118171,
      CONTRATADA: 865,
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10118191,
      CONTRATADA: '1,067',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 13515022,
      CONTRATADA: '112,597',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10118212,
      CONTRATADA: 48,
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10805011,
      CONTRATADA: '1,178',
      PENDIENTE: 485,
      ORDENADO: 485,
    },
    {
      ARTICULO: 10118231,
      CONTRATADA: '1,127',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10118242,
      CONTRATADA: '4,288',
      PENDIENTE: '2,000',
      ORDENADO: '2,000',
    },
    {
      ARTICULO: 13515051,
      CONTRATADA: '10,508',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10118251,
      CONTRATADA: 72,
      PENDIENTE: 4,
      ORDENADO: 4,
    },
    {
      ARTICULO: 10118261,
      CONTRATADA: '4,120',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10118521,
      CONTRATADA: '13,270',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10118541,
      CONTRATADA: '1,640',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10118281,
      CONTRATADA: '1,078',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 19213011,
      CONTRATADA: '2,543',
      PENDIENTE: 260,
      ORDENADO: 260,
    },
    {
      ARTICULO: 10118292,
      CONTRATADA: '12,080',
      PENDIENTE: '3,500',
      ORDENADO: '3,500',
    },
    {
      ARTICULO: 10118301,
      CONTRATADA: '1,047',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
     ARTICULO: 10118332,
      CONTRATADA: '7,776',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10118342,
      CONTRATADA: 491,
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10115012,
      CONTRATADA: '2,840',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10118362,
      CONTRATADA: '35,560',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10126011,
      CONTRATADA: '3,453',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10118381,
      CONTRATADA: '107,486',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10118382,
      CONTRATADA: '8,198',
      PENDIENTE: '2,100',
      ORDENADO: '2,100',
    },
    {
      ARTICULO: 18813011,
      CONTRATADA: '36,056',
      PENDIENTE: '4,800',
      ORDENADO: '4,800',
    },
    {
      ARTICULO: 10118411,
      CONTRATADA: 780,
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10118401,
      CONTRATADA: 633,
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10118431,
      CONTRATADA: '1,212',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10118441,
      CONTRATADA: 111,
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 18815021,
      CONTRATADA: '63,130',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10118463,
      CONTRATADA: '40,722',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10118472,
      CONTRATADA: '1,150',
      PENDIENTE: '',
      ORDENADO: '-',
    },
    {
      ARTICULO: 10118501,
      CONTRATADA: 126,
      PENDIENTE: 21,
      ORDENADO: 21,
    },
    {
      ARTICULO: 10118481,
      CONTRATADA: '1,065',
      PENDIENTE: 633,
      ORDENADO: 633,
    },
  ];

    // Contratada/Ordenada/Pendiente values
    COPData: Object[] = [];

    testPrivData = [{
      'ARTICULO': '13705051',
      'DESCRIPCION': 'Sevredol (Morfina) 20 mg Tabletas Recubiertas 56\/Caja (BaRD PHaRMa)',
      'BODEGA': '002',
      'LABORATORIO': 'BARD PHARMACEUTICALS',
      'CLASE_ABC': 'A',
      'COSTO_PROM_LOC': '530.98200000',
      'ORDEN_MINIMA': '13.1831',
      'FACTOR_EMPAQUE': '56.00000000',
      'CANT_DISPONIBLE': '.00000000',
      'CANT_TRANSITO': '.00000000',
      'CANT_PEDIDA': '.00000000',
      'CANT_RESERVADA': '.00000000',
      'PRECIO_VENTA': null,
      'null': 2017,
      'ENERO': '.00000000',
      'FEBRERO': '.00000000',
      'MARZO': '.00000000',
      'ABRIL': '.00000000',
      'MAYO': '.00000000',
      'JUNIO': '1041414.99620000',
      'JULIO': '.00000000',
      'AGOSTO': '.00000000',
      'SEPTIEMBRE': '.00000000',
      'OCTUBRE': '.00000000',
      'NOVIEMBRE': '.00000000',
      'DICIEMBRE': '.00000000'
    },
    {
      'ARTICULO': '10102011',
      'DESCRIPCION': 'Pancuronio 2mg\/ml Sol. iny. 2ml\/ampolla unidad (Naprod)',
      'BODEGA': '002',
      'LABORATORIO': 'Naprod',
      'CLASE_ABC': 'A',
      'COSTO_PROM_LOC': '19.86650000',
      'ORDEN_MINIMA': '352.3519',
      'FACTOR_EMPAQUE': '1.00000000',
      'CANT_DISPONIBLE': '.00000000',
      'CANT_TRANSITO': '.00000000',
      'CANT_PEDIDA': '.00000000',
      'CANT_RESERVADA': '.00000000',
      'PRECIO_VENTA': '85.00000000',
      'null': 2016,
      'ENERO': '11573.50000000',
      'FEBRERO': '.00000000',
      'MARZO': '.00000000',
      'ABRIL': '.00000000',
      'MAYO': '.00000000',
      'JUNIO': '.00000000',
      'JULIO': '.00000000',
      'AGOSTO': '.00000000',
      'SEPTIEMBRE': '.00000000',
      'OCTUBRE': '.00000000',
      'NOVIEMBRE': '.00000000',
      'DICIEMBRE': '.00000000'
    }];

    constructor(private http: HttpClient) {
      this.CAContractData.forEach(article => {
        const art = <string>(article['ARTICULO']);
        const newObj = {
          CONTRATADA: article['CONTRATADA'],
          PENDIENTE: article['PENDIENTE'],
          ORDENADO: article['ORDENADO'],
        };
        this.COPData[art] = newObj;
      });
    }

    getCAData(): Observable<any> {
        return this.http.get('http://186.1.15.164:8448/gmv_rest/index.php/ESTADISTICA_CA');
    }

    getPrivData(): Observable<any> {
      //return of(this.testPrivData);
      return this.http.get('http://186.1.15.164:8448/gmv_rest/index.php/ESTADISTICA_PRIV');
    }

}
