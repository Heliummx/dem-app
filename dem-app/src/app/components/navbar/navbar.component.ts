import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { LoginService } from '../../services/login.service';
import { Router, NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  constructor(private global: GlobalService, private auth:LoginService, private router:Router) {
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
         if(this.router.url=="/login"){
           this.displayMenu=false;
         }
         else{
           this.displayMenu=true;
         }
        }
      }
    );
  }
  
  adminMenu:boolean=false;
  displayMenu:boolean=false;

  ngOnInit(): void {
    console.log(this.global.getPermiso())
    if(this.global.getPermiso()=="admin"){
      this.adminMenu=true;
    }
    else{
      this.adminMenu=false;
    }
  }

  onLogout():void{
    this.auth.logoutUser();
    this.router.navigate(['/login']);
  }

}
