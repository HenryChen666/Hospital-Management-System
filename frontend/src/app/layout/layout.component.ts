import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router) { }
  links = ['home', 'patients', 'requestlist','registerpatient','contact','divisions','profile'];
  activeLink = this.router.url.split("/")[1];

  ngOnInit(): void {
    if(this.router.url === "/"){
      this.router.navigate(["/home"])
    }
  }

  route(link){
    this.activeLink = link;
    this.router.navigate([link]);
  }

}
