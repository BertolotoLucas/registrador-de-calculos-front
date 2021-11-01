import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  screenValue = '';
  buttonValue = '';
  operation = '';
  lastNumber = '';
  canErasable = true;

  constructor() { }

  ngOnInit(): void {
  }

  addDigtToScreen(event: Event){
    if(this.canErasable){
      this.canErasable = false;
      this.clearTheScreen();
    }
    this.getButtonValue(event);
    this.screenValue = this.screenValue.concat(this.buttonValue);
  }

  clearTheScreen() {
    if(this.screenValue)
      this.screenValue = '';
  }

  addDotToScreen(){
    if(this.screenValue.length>0){
      if(!this.screenValue.includes('.'))
        this.screenValue = this.screenValue.concat('.');
    } else 
        this.screenValue = this.screenValue.concat('0.');
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
      this.canErasable = true;
    }
    console.log("operation: "+this.operation+", last number: "+this.lastNumber);
  }

  getResult(){
    console.log(this.screenValue);
    if (this.lastNumber && this.screenValue && this.operation){
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
    }
  }
  
  private clearCalculator() {
    this.buttonValue = '';
    this.operation = '';
    this.lastNumber = '';
    this.canErasable = true;
  }

  private getButtonValue(event: Event) {
    this.buttonValue = (event.target as HTMLInputElement).textContent || '';
  }
}
