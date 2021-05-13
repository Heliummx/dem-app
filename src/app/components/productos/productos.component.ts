import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { GlobalService } from 'src/app/services/global.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {

  constructor(private api:DataApiService, private toast:ToastService, private global:GlobalService) { }
  
  ngOnInit(): void {
    this.getProductos()
  }

  productos:any=[]
  variantes:any=[]
  stockTotal:any=0
  detalleVar:string=""
  tagsFormat:any=""

  getProductos() {
    if(this.global.getPermiso()=="4dmoNusr3408!"){
      this.api.get('/getRows',{table:"productos_odoo"})
      .subscribe((productos:any)=>{
        this.productos=productos.data;
      })
    }
  }

  getVariantes(id:number, nombre:string, tags:string){
    this.detalleVar=nombre
    this.stockTotal=0;
    this.tagsFormat=tags.split("*")
    if(this.global.getPermiso()=="4dmoNusr3408!"){
      this.api.get('/getOneRow',{table:"variante", field:"productOdooId", value:id})
      .subscribe((variantes:any)=>{
        this.variantes=variantes.data;
        this.variantes.forEach((v:any) => {
          this.stockTotal+=v.stock
        });
      })
    }
  }

  deleteProduct(id:number){
    if(confirm("Si eliminas este producto debes eliminarlo también de cada Shopify en el que se encuentre")){
      let params={
        table:"productos_odoo",
        id:id
      }
       this.api.post('/deleteRow',params)
       .subscribe((response:any)=>{
         // console.log("eliminado")
         this.getProductos()
       })
    }
  }

}
