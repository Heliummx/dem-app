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
  filtered:any=[]
  stockTotal:any=0
  detalleVar:string=""
  tagsFormat:any=""
  word:string="";

  getProductos() {
    if(this.global.getPermiso()=="4dmoNusr3408!"){
      this.api.get('/getRows',{table:"productos_odoo"})
      .subscribe((productos:any)=>{
        this.productos=productos.data;
        this.filtered=this.productos
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
         this.getProductos()
       })
    }
  }

  onSearchChange(): void {  
    this.word=this.word.toLowerCase()
    if(this.word==""){
      this.filtered=this.productos
    }
    else{
       this.filtered=[];
       this.productos.forEach((producto:any) => { 
         if(producto.nombre.toString().toLowerCase().indexOf(this.word)!=-1 || producto.vendor.toString().toLowerCase().indexOf(this.word)!=-1){
           this.filtered.push(producto);
         }
       });
    }
  }

}
