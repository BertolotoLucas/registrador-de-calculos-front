import { Component, OnInit } from '@angular/core';
import { faAngular } from '@fortawesome/free-brands-svg-icons';
import { faBootstrap } from '@fortawesome/free-brands-svg-icons';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { faEnvira } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  faAngular = faAngular;
  faBootstrap = faBootstrap;
  faLeaf = faLeaf;
  faEnvira = faEnvira;
  faEnvelope = faEnvelope;
  vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  constructor() { 
    
  }

  ngOnInit(): void {
    
  }

  ngAfterViewChecked()	: void {
    let navbar = document.getElementsByClassName("navbar");
    let heightNavbar = navbar.item(0)?.scrollHeight;
    var main = document.getElementsByClassName("container");
    var heightMain = main.item(0)?.scrollHeight;
    var footer = document.querySelector("footer");
    var heightFooter = footer?.clientHeight;
    var totalHeight = Number(heightMain) + Number(heightNavbar) + Number(heightFooter);

    console.log("Altura do main: "+ heightMain);
    console.log("Altura do navbar: "+ heightNavbar);
    console.log("Altura do footer: "+ heightFooter);
    console.log("Altura total: "+totalHeight);
    console.log("Altura do vh: "+this.vh);

    if (totalHeight<this.vh) {
      var margin = this.vh - totalHeight;
      console.log("Margem para o footer: "+margin);
      footer!.style.marginTop = margin.toString()+"px";
      console.log()
    } else {
        footer!.style.marginTop = "0px";
    }
  }

}
