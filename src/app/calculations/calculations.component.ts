import { Component, OnInit } from '@angular/core';
import { Calculo } from '../model/calculo';
import { CalculoService } from '../service/calculo.service';
import { OrganizerService } from '../utils/organizer.service';

@Component({
  selector: 'app-calculations',
  templateUrl: './calculations.component.html',
  styleUrls: ['./calculations.component.scss']
})
export class CalculationsComponent implements OnInit {
  calculations: Calculo[] = [];

  constructor(private util:OrganizerService, private calculoService:CalculoService) { }

  ngOnInit():void {
    this.getCalculos();
  }

  ngAfterViewChecked(): void {
    this.util.organizeTheBlocks();
  }  	

  getCalculos(){
    this.calculoService.getCalculos().toPromise().then(
      calculations => this.calculations = calculations
    );
  }

}
