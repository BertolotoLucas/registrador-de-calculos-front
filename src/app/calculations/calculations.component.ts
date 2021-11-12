import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Calculo } from '../model/calculo';
import { CalculoService } from '../service/calculo.service';
import { OrganizerService } from '../utils/organizer.service';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Router } from '@angular/router';
import { NameCheckerService } from '../utils/name-checker.service';
import { PageCalculo } from '../model/page-calculo';

@Component({
  selector: 'app-calculations',
  templateUrl: './calculations.component.html',
  styleUrls: ['./calculations.component.scss']
})
export class CalculationsComponent implements OnInit {
  name = '';
  calculations: Calculo[] = [];
  isFinding = false;
  actualPage = 0;
  lastPage = 0;
  totalItens = 0;

  constructor(private util:OrganizerService, private calculoService:CalculoService, private router:Router, private nameChecker: NameCheckerService) {}

  ngOnInit():void {
    this.name = history.state.data;
    //this.nameChecker.check(this.name,this.router);  
    this.getCalculos();
  }

  ngAfterViewChecked(): void {
    this.util.organizeTheBlocks();
  }  	


  search(name: string): void {
    this.calculoService.searchCalculoByNome(name).toPromise().then(
      page => {
        this.catchDataFrom(page);
      }
    );
    this.isFinding = true;
  }

  private catchDataFrom(page: PageCalculo) {
    this.actualPage = page.currentPage;
    this.lastPage = page.totalPages;
    this.totalItens = page.totalItems;
    this.calculations = this.formatCalculations(page.calculos);
  }

  getCalculos(){
    this.calculoService.getCalculosPage().toPromise().then(
      page => {
        this.catchDataFrom(page);
      }
    );
  }

  formatCalculations(calculations: Calculo[]): Calculo[] {
    calculations.forEach(x => x.operacao);
    calculations.forEach(
      calc => {
        calc.operacao = this.formatOperation(calc.operacao)
      }
    );
    return calculations;
  }

  formatOperation(operation: string | undefined): string | undefined {
    var result = operation?.split(',')[0];
    var symbol = operation?.split(',')[1];
    switch(symbol) {
      case 'plus':{
        result = result?.concat(" + ");
        break;
      }
      case 'minus':{
        result = result?.concat(" - ");
        break;
      }
      case 'multiply':{
        result = result?.concat(" * ");
        break;
      }
      case 'divide':{
        result = result?.concat(" / ");
        break;
      }
      default:{
        console.log("Operation is not supported!");
        break;
      }
    }
    result = result?.concat(operation!.split(',')[2]);
    return result;
  }

  returnToCalculator(){
    const routes: string[] = [];
    if (this.name) {
      routes.push("calculator");
      this.router.navigate(routes,{state:{data:this.name}});
    }
  }

}
