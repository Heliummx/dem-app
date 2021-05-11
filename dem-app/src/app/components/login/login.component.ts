import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth:LoginService, 
    public router:Router,
    public toastr:ToastService,
    private global: GlobalService
  ) { }

  public user:any ={
    email:"",
    password:""
  };

  public current:any;

  ngOnInit() {
  }

  onLogin(){
    return this.auth.loginuser(this.user.email,this.user.password)
    .subscribe((succes:any)=>{
      if(succes.message && succes.message == "fail"){
        this.toastr.showError('Contraseña o correo inválidos');
      }
      else{
        this.auth.setUser(succes);
        let token=succes.clave;
        this.auth.setToken(token);
        this.current=this.auth.getCurrentUser();
        this.global.setPermiso(this.current.permiso);

        if(this.global.getPermiso()=="admin"){
          this.toastr.showSuccess('Inicio de sesión exitoso');
          this.router.navigate(["/tiendas"])
        }
        else if (this.global.getPermiso()=="user"){
          this.toastr.showSuccess('Inicio de sesión exitoso');
          this.router.navigate(["/tiendas-distribuidor"])
        }   
        else{
          this.toastr.showError('Usuario inválido')
        }
      
      }


    }, (err:any)=>{
      console.log(err)
      this.toastr.showError('Error en el servidor');
    })
  }

}
