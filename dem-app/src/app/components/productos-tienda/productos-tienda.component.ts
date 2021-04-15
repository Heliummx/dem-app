import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataApiService } from 'src/app/services/data-api.service';
import { GlobalService } from 'src/app/services/global.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-productos-tienda',
  templateUrl: './productos-tienda.component.html',
  styleUrls: ['./productos-tienda.component.css']
})
export class ProductosTiendaComponent implements OnInit {
  
  constructor(private api:DataApiService, private toast:ToastService, private global:GlobalService, public activated:ActivatedRoute) { }
  
  ngOnInit(): void {
    this.tiendaId=this.activated.snapshot.paramMap.get("id");
    this.getTienda(this.tiendaId)
    this.getAllProductos();
  }
  
  displayPrecio: boolean=false;
  productos:any=[]
  allProductos:any=[]
  variantes:any=[]
  tiendaId:any
  tienda:any
  nuevoProducto:any={odoo_sync:true}

  getTienda(id:number){
    if(this.global.getPermiso()=="admin"){
      this.api.get('/getOneRow',{table:"tienda", field:"id", value:id})
      .subscribe((tienda:any)=>{
        this.tienda=tienda.data[0];
      })
    }
  }

  getProductos(id:number){
    if(this.global.getPermiso()=="admin"){
      this.api.get('/getOneRow',{table:"productos_registrados", field:"tiendaId", value:id})
      .subscribe((productos:any)=>{
        this.productos=productos.data;
      })
    }
  }

  deleteProduct(id:number){
    if(confirm("Si eliminas este producto debes eliminarlo también de cada Shopify en el que se encuentre")){
      let params={
        table:"productos_registrados",
        id:id
      }
       this.api.post('/deleteRow',params)
       .subscribe((response:any)=>{
         this.getProductos(this.tiendaId)
       })
    }
  }

  getAllProductos() {
    if(this.global.getPermiso()=="admin"){
      this.api.get('/getRows',{table:"productos_odoo"})
      .subscribe((productos:any)=>{
        this.allProductos=productos.data;
      })
    }
  }

  agregarProducto(){
    if(this.nuevoProducto.id!==undefined && this.nuevoProducto.odoo_sync!==undefined){
      let desc="..." //obtener descripcion del producto por su id
      if(this.nuevoProducto.odoo_sync==false && this.nuevoProducto.precio_custom > 0){
        let values=[this.nuevoProducto.precio_custom, desc, false, this.nuevoProducto.id, this.tiendaId]
        this.doProductPost("productos_registrados", values);
      }
      else if(this.nuevoProducto.odoo_sync){
        let values=[0, desc, true, this.nuevoProducto.id, this.tiendaId]
        this.doProductPost("productos_registrados", values);
      }
      else{
        this.toast.showError("Revisa tus valores")
        return
      }
    }
    else{
      this.toast.showError("Debes llenar los campos")
      return
    }
  }

  doProductPost(table:string, values:any){
    let apiParams={table:table, values:values}
    this.api.post('/addProductToStore',apiParams)
      .subscribe((done:any)=>{
          this.toast.showSuccess("Agredado")  
          this.nuevoProducto={}
      },(err)=>{
        this.toast.showError("Error en el servidor")
      })
  }

  checkSwitch(){
    this.nuevoProducto.odoo_sync=!this.nuevoProducto.odoo_sync
    if(this.nuevoProducto.odoo_sync){
      this.displayPrecio=false
    }
    else{
      this.displayPrecio=true;
    }
  }

}
