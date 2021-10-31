import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  screenValue = '';
  buttonValue = '';

  constructor() { }

  ngOnInit(): void {
  }

  addDigtToScreen(event: Event){
    this.buttonValue = (event.target as HTMLInputElement).textContent || '';
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

}
