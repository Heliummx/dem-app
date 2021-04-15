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
    console.log(this.tiendaId)
    this.getProductos(this.tiendaId);
  }

  productos:any=[]
  variantes:any=[]
  tiendaId:any

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
         // console.log("eliminado")
         this.getProductos(this.tiendaId)
       })
    }
  }
}
