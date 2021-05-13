import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  
  constructor(private router: Router) { 
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
         if(this.router.url=="/login"){
           this.displayFooter=false;
         }
         else{
           this.displayFooter=true;
         }
        }
      }
    );
  }
  
  displayFooter:boolean=true;
  
  ngOnInit(): void {
    
  }

}
