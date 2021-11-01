import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  screenValue = '0';
  buttonValue = '';
  operation = '';
  lastNumber = '';
  canReplace = false;

  constructor() { }

  ngOnInit(): void {
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
        this.screenValue = this.screenValue.concat('.');
        this.canReplace = false;
      }
    } else{ 
      this.screenValue = this.screenValue.concat('0.');
      this.canReplace = false;
    }
  }
  
  addOperation(event:Event){
    if(this.screenValue){
      this.lastNumber = this.screenValue;
      this.getButtonValue(event);
      switch(this.buttonValue) { 
        case '+': { 
          this.operation = "sum"; 
          break; 
        } 
        case '-': { 
          this.operation = "minus"; 
          break; 
        } 
        default: { 
          this.operation = ''; 
          break; 
        } 
      }
      this.canReplace=true;
    }
    console.log("operation: "+this.operation+", last number: "+this.lastNumber);
  }

  getResult(){
    if (this.lastNumber && this.screenValue && this.operation && !this.canReplace){
      console.log("sending to server: "+ this.operation
        + ", last number: "+this.lastNumber 
        +" screen value: " + this.screenValue );
      const x1 = Number(this.lastNumber);
      const x2 = Number(this.screenValue)
      switch(this.operation) {
        case 'sum':{
          this.screenValue = (x1+x2).toString();
          break;
        }
        case 'minus':{
          this.screenValue = (x1-x2).toString();
          break;
        }
        default:{
          console.log("Operation is not supported!");
          break;
        }
      }
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
}
