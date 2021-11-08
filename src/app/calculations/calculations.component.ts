import { Component, OnInit } from '@angular/core';
import { Calculo } from '../model/calculo';
import { CalculoService } from '../service/calculo.service';

@Component({
  selector: 'app-calculations',
  templateUrl: './calculations.component.html',
  styleUrls: ['./calculations.component.scss']
})
export class CalculationsComponent implements OnInit {
  calculations: Calculo[] = [];

  constructor(private calculoService:CalculoService) { }

  ngOnInit(): void {
    this.getCalculos();
  }

  getCalculos(): void {
    this.calculoService.getCalculos().subscribe(
      calculations => this.calculations = calculations
    );
  }

}
