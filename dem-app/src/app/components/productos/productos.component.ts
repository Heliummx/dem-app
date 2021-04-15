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

  getProductos() {
    if(this.global.getPermiso()=="admin"){
      this.api.get('/getRows',{table:"productos_odoo"})
      .subscribe((productos:any)=>{
        this.productos=productos.data;
      })
    }
  }

  getVariantes(id:number){
    if(this.global.getPermiso()=="admin"){
      this.api.get('/getOneRow',{table:"variante", field:"productOdooId", value:id})
      .subscribe((variantes:any)=>{
        this.variantes=variantes.data;
        console.log(this.variantes)
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
