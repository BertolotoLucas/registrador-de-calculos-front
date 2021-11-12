import { Injectable } from '@angular/core';
import { Calculo } from './calculo';

@Injectable({
  providedIn: 'root'
})
export class PageCalculoService {
    totalItems!: number;
    calculos?: Calculo[];
    totalPages!: number;
    currentPage!: number;

  constructor() { }
}
