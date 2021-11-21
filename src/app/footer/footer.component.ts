import { Component, OnInit } from '@angular/core';
import { faAngular, faBootstrap, faEnvira, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLeaf } from '@fortawesome/free-solid-svg-icons';

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
  
  constructor() {}

  ngOnInit(): void {
    
  }
}
