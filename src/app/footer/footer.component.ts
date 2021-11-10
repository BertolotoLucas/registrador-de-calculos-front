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
  
  constructor() {}

  ngOnInit(): void {
    
  }
}
