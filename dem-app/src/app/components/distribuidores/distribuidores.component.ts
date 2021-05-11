import { Component, OnInit } from '@angular/core';
import {DataApiService} from '../../services/data-api.service';
import { GlobalService } from '../../services/global.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-distribuidores',
  templateUrl: './distribuidores.component.html',
  styleUrls: ['./distribuidores.component.css']
})
export class DistribuidoresComponent implements OnInit {
  public  sendPass: any={};
  public  userId: any="";
  public  pass1: any="";
  public  pass2: any="";


  constructor(public api:DataApiService, public global:GlobalService, public toast:ToastService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  public users:any=[]

  getUsers(){
      if(this.global.getPermiso()=="4dmoNusr3408!"){
        this.api.get('/getUsersWithCredentials', {})
        .subscribe((usuarios:any)=>{
        //  console.log(usuarios)
          this.users=usuarios.users;
        })
      }
  }

  deleteUser(credentialsId:number){
    if(confirm("Si eliminas a este usuario también se borrara su tienda del sistema ¿Estás seguro?")){
      let params={
        table:"credenciales",
        id:credentialsId
      }
       this.api.post('/deleteRow',params)
       .subscribe((response:any)=>{
         // console.log("eliminado")
         this.getUsers()
       })
    }
  }

  validatePass(pass1:string, pass2:string){   
    this.sendPass.id=this.userId;
    this.sendPass.newPassword=pass1;
    
    if(pass1===pass2){
      if(pass1.length>6){
        console.log("se manda")
        this.api.post('/setPass',this.sendPass)
        .subscribe((done)=>{
          this.toast.showSuccess("Contraseña cambiada satisfactoriamente")
        })
      }
      else{
        this.toast.showError("La contraseña es demasiado corta")
        this.pass1=""
        this.pass2=""
      }
    }
    else{
      this.toast.showError("Las contraseñas no coinciden")
      this.pass1=""
      this.pass2=""
    }
  }

}
