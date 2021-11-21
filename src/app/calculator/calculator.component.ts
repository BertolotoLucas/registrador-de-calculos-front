import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faList } from '@fortawesome/free-solid-svg-icons';

import { Calculo } from '../model/calculo';
import { CalculoService } from '../service/calculo.service';
import { NameCheckerService } from '../utils/name-checker.service';
import { OrganizerService } from '../utils/organizer.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  public nextPage = "calculations";
  faList = faList;
  name = '';
  screenValue = '0';
  buttonValue = '';
  operation = '';
  lastNumber = '';
  canReplace = false;

  constructor(private util:OrganizerService, private calculoService:CalculoService, private router:Router, private nameChecker:NameCheckerService) { }

  ngOnInit(): void {
    this.name = history.state.data;
    this.nameChecker.check(this.name,this.router);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.util.organizeTheBlocks(), 0.001);
  }

  addDigtToScreen(event: Event){
    this.getButtonValue(event);
    if (this.canReplace){
      this.screenValue='0';
      this.canReplace=false;
    }
    if (this.screenValue==='0'){
      this.screenValue='';
      if (this.buttonValue==='00')
        this.buttonValue = '0';
    }
    this.screenValue = this.screenValue.concat(this.buttonValue);
  }

  convertNumberToPorcent(){
    if (this.screenValue) {
      if (!isNaN(Number(this.screenValue))) {
        var i = Number(this.screenValue);
        i = i/100;
        this.screenValue = i.toString();
      }
    }
  }

  clearTheScreen() {
    if(this.screenValue){
      this.screenValue = '0';
      this.canReplace = true;
    }
  }

  addDotToScreen(){
    if(this.screenValue.length>0){
      if(!this.screenValue.includes('.')){
        if (this.canReplace) {
          this.screenValue = '0.'
        } else {
          this.screenValue = this.screenValue.concat('.');
        }
        this.canReplace = false;
      }
    } else{ 
      this.screenValue = this.screenValue.concat('0.');
      this.canReplace = false;
    }
  }
  
  addOperation(event:Event){
    if(this.screenValue)
    if(!isNaN(Number(this.screenValue))){
      this.lastNumber = this.screenValue;
      this.getButtonValue(event);
      switch(this.buttonValue) { 
        case '+': { 
          this.operation = "plus"; 
          break; 
        } 
        case '-': { 
          this.operation = "minus"; 
          break; 
        }
        case '*': {
          this.operation = "multiply";
          break;
        }
        case '/': {
          this.operation = "divide";
          break;
        } 
        default: { 
          this.operation = ''; 
          break; 
        } 
      }
      this.canReplace=true;
    }
  }

  async getResult(){
    if (this.lastNumber && this.screenValue && this.operation && !this.canReplace){
      var calculo: Calculo = new Calculo();
      calculo.setnomePessoa(this.name);
      calculo.setoperacao(this.lastNumber+','+this.operation+','+this.screenValue);
      calculo.setresultado((await this.calculoService.addCalculo(calculo).toPromise()).resultado); //Getters doesnot work with promisses..
      this.screenValue = calculo.getresultado()?.toString()||"Error";
      this.clearCalculator();
      this.canReplace=true;
    }
  }
  
  private clearCalculator() {
    this.buttonValue = '';
    this.operation = '';
    this.lastNumber = '';
  }

  private getButtonValue(event: Event) {
    this.buttonValue = (event.target as HTMLInputElement).textContent || '';
  }

  public goToList(){
    this.router.navigate([this.nextPage], {state: {data: this.name}});
  }

}
