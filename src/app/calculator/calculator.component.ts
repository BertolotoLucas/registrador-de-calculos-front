import { Component, OnInit } from '@angular/core';
import { Calculo } from '../model/calculo';
import { CalculoService } from '../service/calculo.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  name = '';
  screenValue = '0';
  buttonValue = '';
  operation = '';
  lastNumber = '';
  canReplace = false;

  constructor(private calculoService:CalculoService) { }

  ngOnInit(): void {
    this.name = history.state.data;
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
    // console.log("operation: "+this.operation+", last number: "+this.lastNumber);
  }

  async getResult(){
    if (this.lastNumber && this.screenValue && this.operation && !this.canReplace){
      // console.log("sending to server: "+ this.operation
      //   + ", last number: "+this.lastNumber 
      //   +" screen value: " + this.screenValue );
      var calculo: Calculo = new Calculo();
      calculo.setnomePessoa(this.name);
      calculo.setoperacao(this.lastNumber+','+this.operation+','+this.screenValue);
      calculo.setresultado((await this.calculoService.addCalculo(calculo).toPromise()).resultado); //Getters doesnot work with promisses..
      // const x1 = Number(this.lastNumber);
      // const x2 = Number(this.screenValue)
      // switch(this.operation) {
      //   case 'sum':{
      //     this.screenValue = (x1+x2).toString();
      //     break;
      //   }
      //   case 'minus':{
      //     this.screenValue = (x1-x2).toString();
      //     break;
      //   }
      //   case 'multiply':{
      //     this.screenValue = (x1*x2).toString();
      //     break;
      //   }
      //   case 'divide':{
      //     if (x2===0){
      //       this.screenValue = "Error.";
      //     } else {
      //        this.screenValue = (x1/x2).toString();
      //     }
      //     break;
      //   }
      //   default:{
      //     console.log("Operation is not supported!");
      //     break;
      //   }
      // // }
      // let str = '';
      // str = JSON.stringify(calculo);
      // console.log(str);
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

  private goToList(){
    
  }

}
