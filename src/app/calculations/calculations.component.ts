import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { Calculo } from '../model/calculo';
import { PageCalculo } from '../model/page-calculo';
import { CalculoService } from '../service/calculo.service';
import { NameCheckerService } from '../utils/name-checker.service';
import { OrganizerService } from '../utils/organizer.service';

@Component({
  selector: 'app-calculations',
  templateUrl: './calculations.component.html',
  styleUrls: ['./calculations.component.scss']
})
export class CalculationsComponent implements OnInit, AfterViewChecked{
  faArrowLeft = faArrowLeft;
  faSearch = faSearch;
  name = '';
  calculations: Calculo[] = [];
  isFinding = false;
  actualPage = 0;
  lastPage = 0;
  totalItens = 0;
  nomePessoa = '';

  constructor(private util:OrganizerService, private calculoService:CalculoService, private router:Router, private nameChecker: NameCheckerService) {}

  ngOnInit():void {
    this.name = history.state.data;
    this.nameChecker.check(this.name,this.router);
    this.getCalculos();  
    this.util.organizeTheBlocks();
  }

  ngAfterViewChecked(): void {
    this.util.organizePagination();
    this.util.organizeTheBlocks();
  }
  
  getPage(numPage:number){
    if(this.nomePessoa==''){
      this.getCalculos(numPage);
    }
    else {
      this.search(this.nomePessoa, numPage);
    }
  }


  search(name: string, numPage=0): void {
    this.nomePessoa=name;
    this.calculoService.searchCalculoByNome(name, numPage).toPromise().then(
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

  getCalculos(numPage=0){
    this.calculoService.getCalculosPage(numPage).toPromise().then(
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
