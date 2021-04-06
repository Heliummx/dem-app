import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth:LoginService, 
    public router:Router,
    public toastr:ToastService
  ) { }

  public user:any ={
  email:"",
  password:""
  };

  public current:any;

  ngOnInit() {

    console.log("ewe")

  }

  onLogin(){
    return this.auth.loginuser(this.user.email,this.user.password)
    .subscribe((succes:any)=>{
      this.auth.setUser(succes.user);
      let token=succes.id;
      this.auth.setToken(token);
      this.current=this.auth.getCurrentUser();

      if(this.current.realm=="admin" && this.current.active){
        this.toastr.showSuccess('Inicio de sesión exitoso');
        this.router.navigate(["/usuarios"])
      }
      else if (this.current.realm=="user" && this.current.active){
        this.toastr.showSuccess('Inicio de sesión exitoso');
        this.router.navigate(["/subtareas"])
      }   
      else{
        this.toastr.showError('Usuario invalido')
      }
    }, (err:any)=>{
      this.toastr.showError('Error en el servidor');
    })
  }

}
