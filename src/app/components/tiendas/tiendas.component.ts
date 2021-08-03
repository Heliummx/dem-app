import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { ToastService } from 'src/app/services/toast.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent implements OnInit {

  public tiendas:any=[]
  public nuevaTienda:any={}
  public users:any=[]

  public tiendaEdit:any={}

  constructor( private global: GlobalService, private api:DataApiService , private toast:ToastService) { }

  ngOnInit(): void {
    this.getRepresentantes();
    this.getTiendas();
  }
  
  getRepresentantes() {
    if(this.global.getPermiso()=="4dmoNusr3408!"){
      this.api.get('/getUsersWithCredentials', {})
        .subscribe((usuarios:any)=>{
          this.users=usuarios.users;
          this.users = this.users.filter((obj:any) => obj.nombre != "Administrador MDH");  //DEJALO SI NOMBRE ES DIFERENTE DE ADMINISTRADOR MDH
        })
    }
  }

  getRepresentante(id:number){
    let representante = this.users.find((i:any) => i.id == id);
    if(representante){
      return(representante.nombre)
    }
    else{
      return "N/E"
    }
  }

  getTiendas() {
    if(this.global.getPermiso()=="4dmoNusr3408!"){
      this.api.get('/getRows',{table:"tienda"})
        .subscribe((tiendas:any)=>{
          this.tiendas=tiendas.data;
        })
    }
  }

  public setTiendaEdit(tienda:any){
    this.tiendaEdit=tienda
  }

  public deleteTienda(id:number){
      if(confirm("¿Estás seguro que deseas eliminar está tienda?")){
        let params={
          table:"tienda",
          id:id
        }
         this.api.post('/deleteRow',params)
         .subscribe((response:any)=>{
           this.getTiendas()
           this.toast.showSuccess("Tienda eliminada con exito")
         },
         (err)=>{ throw err })
      }  
  }

  public addAll(id:number){
    if(confirm("¿Quieres subir todos los productos del DEM a esta tienda?")){
      let params={
        table:"tienda",
        id:id
      }
       this.api.post('/allProductsToStore',params)
       .subscribe((response:any)=>{
         this.toast.showInfo("Esta acción tomará varios minutos")
       },
       (err)=>{
         console.log("error from server on Add All") 
         throw err
        })
    }  
}

  public crearTienda(){
    if(this.allPropertiesStore(this.nuevaTienda)){
      if(this.global.getPermiso()=="4dmoNusr3408!"){
        let table="tienda";
        let values=[this.nuevaTienda.nombre, this.nuevaTienda.api_key, this.nuevaTienda.api_pass, this.nuevaTienda.secreto, this.nuevaTienda.representanteId, this.nuevaTienda.hostname, "location", 15 ]
        let apiParams={table:table, values:values}

        this.nuevaTienda.hostname=this.nuevaTienda.hostname.replace('https://', '')
        if(this.nuevaTienda.hostname && this.nuevaTienda.hostname[this.nuevaTienda.hostname.length - 1]=="/"){ 
          values[5] = this.nuevaTienda.hostname.slice(0, -1)
        }

        this.api.post('/addStore',apiParams)
        .subscribe((done:any)=>{
          if(done.message=="Tienda agregada"){
            this.toast.showSuccess("La tienda se ha agregado")
            this.nuevaTienda={}
            this.getTiendas()
          }
          else{
            this.toast.showError("Error al crear la tienda, revisa tus valores")
          }
        },(err)=>{
          this.toast.showError("Error al crear la tienda, revisa tus valores")
        })
      }
    }
    else{
      this.toast.showError("Debes llenar todos los campos")
    }
  }

  public editarTienda(){
    if(this.allPropertiesStore(this.tiendaEdit) && this.tiendaEdit.descuento){
      if(this.global.getPermiso()=="4dmoNusr3408!"){
        let table="tienda";
        let values=[this.tiendaEdit.nombre, this.tiendaEdit.api_key, this.tiendaEdit.api_pass, this.tiendaEdit.secreto, this.tiendaEdit.representanteId, this.tiendaEdit.hostname, this.tiendaEdit.location, this.tiendaEdit.descuento, this.tiendaEdit.id ]
        let apiParams={table:table, values:values}

        this.tiendaEdit.hostname=this.tiendaEdit.hostname.replace('https://', '')
        if(this.tiendaEdit.hostname && this.tiendaEdit.hostname[this.tiendaEdit.hostname.length - 1]=="/"){ 
          values[5] = this.tiendaEdit.hostname.slice(0, -1)
        }

        console.log(apiParams)
        this.api.post('/editStore',apiParams)
        .subscribe((done:any)=>{
          console.log(done)
          if(done.message=="Tienda editada"){
            this.toast.showSuccess("La tienda se ha editado")
            this.tiendaEdit={}
            this.getTiendas()
          }
          else{
            this.toast.showError("Error al crear la tienda, revisa tus valores")
          }
        },(err)=>{
          this.toast.showError("Error al crear la tienda, revisa tus valores")
        })

      }
    }
    else{
      this.toast.showError("Debes llenar todos los campos")
    }
  }

  public allPropertiesStore(tienda:any) {
    if(tienda.nombre && tienda.api_key && tienda.api_pass && tienda.secreto && tienda.representanteId && tienda.hostname){  return true }
    else{ return false }
  }

}
