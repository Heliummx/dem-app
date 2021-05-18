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
  
  constructor(private api:DataApiService, private toast:ToastService, public global:GlobalService, public activated:ActivatedRoute) { }
  
  ngOnInit(): void {
    this.tiendaId=this.activated.snapshot.paramMap.get("id");
    this.getTienda(this.tiendaId)
    this.getProductos(this.tiendaId);
  }
  
  displayPrecio: boolean=false;
  productos:any=[]
  allProductos:any=[]
  variantes:any=[]
  editedPrices:any=[]
  tiendaId:any
  tienda:any
  nuevoProducto:any={odoo_sync:true}
  editProduct:any={
    shopifyProductId:"",
    name:"",
    description:"",
    tiendaId:""
  }
  word: string="";
  filtered:any=[];

  getTienda(id:number){
    //if(this.global.getPermiso()=="4dmoNusr3408!")
      this.api.get('/getOneRow',{table:"tienda", field:"id", value:id})
      .subscribe((tienda:any)=>{
        this.tienda=tienda.data[0];
      })
    
  }

  getProductos(id:number){
      this.api.get('/getRegisteredProducts',{storeId:id})
      .subscribe((productos:any)=>{
      //  console.log(productos)
        this.productos=productos.products;
        this.filtered=this.productos
        this.getAllProductos()
      })
  }

  deleteProduct(prId:number, shopifyId:any){
    if(confirm("Si eliminas esta variante, se eliminará todo el producto, ¿estas seguro?")){
      let params={
        table:"productos_registrados",
        prId:prId,
        shopifyId:shopifyId,
        tiendaId:this.tiendaId
      }
     // console.log(params)
       this.api.post('/deleteShopifyProduct',params)
       .subscribe((response:any)=>{
      //   console.log("res", response)
         this.getProductos(this.tiendaId)
         this.toast.showInfo("Producto eliminado de la tienda")
       },(err)=>{ this.getProductos(this.tiendaId) })
    }
  }

  getAllProductos() {
      this.api.get('/getRows',{table:"productos_odoo"})
      .subscribe((productos:any)=>{
        this.allProductos=productos.data;
        this.productos.forEach((product:any) => { 
          this.allProductos.some((e:any) => {
            if(e.nombre == product.nombre){
              this.allProductos=this.allProductos.filter((el:any) => { return el.id != e.id }); 
            }
          }) 
        })
      })
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

  async doProductPost(table:string, values:any){
    let productOdooId=values[3]
    this.api.get('/getOneRow',{table:"variante", field:"productOdooId", value:values[3]})
    .subscribe((variantes:any)=>{
      this.variantes=variantes.data;
      let variantValues:Array<Array<any>>=[]  
      this.variantes.forEach((variant:any, i:number) => {
         let id=variant.id 
         variantValues[i]=[]
         variantValues[i][0]=values[0]
         variantValues[i][1]=values[1]
         variantValues[i][2]=values[2]
         variantValues[i][3]=id
         variantValues[i][4]=values[4]
      });
      let apiParams={table:table, values:variantValues, productOdooId:productOdooId}
      this.api.post('/addProductToStore',apiParams)
        .subscribe((done:any)=>{
            this.toast.showSuccess("Agredado")  
            this.nuevoProducto={odoo_sync:true}
            this.getProductos(this.tiendaId);
        },(err)=>{
          this.toast.showError("Error en el servidor")
        })
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

  async getVariantes(id:number){
    this.api.get('/getOneRow',{table:"variante", field:"productOdooId", value:id})
    .subscribe((variantes:any)=>{
      this.variantes=variantes.data;
    //   console.log(this.variantes)
      return this.variantes
    })
  }

  cambiarPrecio(){
    let nuevosPrecios:any=[]
    let zero=false;
    this.editedPrices.forEach((product:any) => {
      if(!product.odoo_sync){
        if(product.precio_custom > 0){
          nuevosPrecios.push({tiendaId:this.tiendaId, precio:product.precio_custom, variantId:product.id, odoo_sync:false, shopifyId:product.shopifyId, shopifyVariantId:product.shopifyVariantId})
        }
        else{
          this.toast.showError("El precio debe ser mayor de 0")
          zero=true
        }
      }
      else{
        nuevosPrecios.push({tiendaId:this.tiendaId, precio:0, variantId:product.id, odoo_sync:true, shopifyId:product.shopifyId, shopifyVariantId:product.shopifyVariantId})
      }
    });
    if(nuevosPrecios.length && !zero){
      this.api.post('/editStorePrices', nuevosPrecios)
      .subscribe((done:any)=>{ })
      this.editedPrices=[]
    }
    else{
      this.toast.showInfo("No hiciste cambios")
    }
  }

  setVariantIds(shopifyProductId:any, productName:any){
    this.editProduct.shopifyProductId=shopifyProductId
    this.editProduct.name=productName    
    this.editProduct.description=""
    this.editProduct.tiendaId=this.tiendaId
  }

  cambiarDescripcion(editProduct:any){
    this.api.post('/editProductDesc', {shopifyProductId:editProduct.shopifyProductId, description:editProduct.description, tiendaId:this.tiendaId})
    .subscribe((done:any)=>{
      this.toast.showSuccess("Editado con éxito")
    })
  }

  onSearchChange(): void {  
    this.word=this.word.toLowerCase()
    if(this.word==""){
      this.filtered=this.productos
    }
    else{
       this.filtered=[];
       this.productos.forEach((producto:any) => {
         console.log(producto)
         if(producto.nombre.toString().toLowerCase().indexOf(this.word)!=-1 || producto.sku.toString().toLowerCase().indexOf(this.word)!=-1){
           this.filtered.push(producto);
         }
       });
    }
  }
  
}
