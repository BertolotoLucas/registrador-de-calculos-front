import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
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
  faArrowLeft = faArrowLeft;
  nextPage = "calculations";
  faList = faList;
  name = '';
  screenValue = '0';
  buttonValue = '';
  operation = '';
  lastNumber = '';
  canReplace = false;
  btnSound: HTMLAudioElement | undefined;
  btnResultSound: HTMLAudioElement | undefined; 
  btnErrorSound: HTMLAudioElement | undefined;

  constructor(private util:OrganizerService, private calculoService:CalculoService, private router:Router, private nameChecker:NameCheckerService) { }

  ngOnInit(): void {
    this.name = history.state.data;
    this.nameChecker.check(this.name,this.router);
    this.getSounds();
  }

  private getSounds() {
    this.btnSound = new Audio();
    this.btnSound.src = "/assets/sound/button-sound.mp3";
    this.btnResultSound = new Audio();
    this.btnResultSound.src = "/assets/sound/result-sound.mp3";
    this.btnErrorSound = new Audio();
    this.btnErrorSound.src = "/assets/sound/error-sound.mp3";
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.util.organizeTheBlocks(), 0.001);
  }

  addDigtToScreenByEvent(event: Event){
    this.getButtonValue(event);
    this.setScreenValueByBtnValue();
  }

  private setScreenValueByBtnValue() {
    this.verifyReplaceable();
    this.verifyLeadingZeros();
    this.concatDigitsValueOnScreen();
    this.playBtnSound();
  }

  private playBtnSound() {
    this.btnSound?.play();
  }

  private concatDigitsValueOnScreen() {
    this.screenValue = this.screenValue.concat(this.buttonValue);
  }

  private verifyLeadingZeros() {
    if (this.screenValue === '0') {
      this.screenValue = '';
      if (this.buttonValue === '00')
        this.buttonValue = '0';
    }
  }

  private verifyReplaceable() {
    if (this.canReplace) {
      this.screenValue = '0';
      this.canReplace = false;
    }
  }

  convertNumberToPorcent(){
    if (this.screenValue) {
      if (!isNaN(Number(this.screenValue))) {
        var i = Number(this.screenValue);
        i = i/100;
        this.screenValue = i.toString();
      }
    }
    this.playBtnSound();
  }

  clearTheScreen() {
    if(this.screenValue){
      this.screenValue = '0';
      this.canReplace = true;
    }
    this.playBtnSound();
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
        this.playBtnSound();
      }
    } else{ 
      this.screenValue = this.screenValue.concat('0.');
      this.canReplace = false;
      this.playBtnSound();
    }
  }
  
  addOperationByEvent(event:Event){
    if(this.verifyScreenValue()){
      this.getButtonValue(event);
      this.getTheLastValueOfScreen();
      this.setOperationByBtnValue();
      this.canReplace=true;
    }
  }

  private verifyScreenValue() {
    if (this.screenValue)
      return !isNaN(Number(this.screenValue));
    else return false;
  }

  private getTheLastValueOfScreen() {
    this.lastNumber = this.screenValue;
  }

  private setOperationByBtnValue() {
    switch (this.buttonValue) {
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
    this.playBtnSound();
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
      if (!(this.screenValue == "Error")) {
        this.playResultBtnSound();
      } else {
        this.playBtnErrorSound();
      }
    }
  }
  
  private playBtnErrorSound() {
    this.btnErrorSound?.play();
  }
  
  private playResultBtnSound() {
    this.btnResultSound?.play();
  }

  private clearCalculator() {
    this.buttonValue = '';
    this.operation = '';
    this.lastNumber = '';
    this.playBtnSound();
  }

  private getButtonValue(event: Event) {
    this.buttonValue = (event.target as HTMLInputElement).textContent || '';
  }

  private setButtonValue(key: string) {
    this.buttonValue = key;
  }

  public goToList(){
    this.router.navigate([this.nextPage], {state: {data: this.name}});
  }

  public goToInputName(){
    this.router.navigate(["index"], {state: {data: this.name}});
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    const key = event.key;
    if (key == "0" || key == "1" || key == "2" || key == "3" || key == "4" || key == "5" || key == "6" || key == "7" || key == "8" || key == "9") {
      this.addDigtToScreenByKeyPressed(key);
    } else if (key == "/" || key == "*" || key == "-" || key == "+") {
      this.addOperationByKeyPressed(key);
    } else if (key == ".") {
      this.addDotToScreen();
    } else if (key == "%") {
      this.convertNumberToPorcent();
    } else if (key == "Backspace") {
      this.clearTheScreen();
    } else if (key == "Enter") {
      this.getResult();
    }
  }

  private addOperationByKeyPressed(key: string) {
    if (this.verifyScreenValue()) {
      this.setButtonValue(key);
      this.getTheLastValueOfScreen();
      this.setOperationByBtnValue();
      this.canReplace = true;
    }
  }

  private addDigtToScreenByKeyPressed(key: string) {
    this.setButtonValue(key);
    this.setScreenValueByBtnValue();
  }
}
