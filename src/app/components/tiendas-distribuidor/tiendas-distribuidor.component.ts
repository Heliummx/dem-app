import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { LoginService } from 'src/app/services/login.service';
import { ToastService } from 'src/app/services/toast.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-tiendas-distribuidor',
  templateUrl: './tiendas-distribuidor.component.html',
  styleUrls: ['./tiendas-distribuidor.component.css']
})

export class TiendasDistribuidorComponent implements OnInit {

  public tiendas:any
  public nuevaTienda:any={}
  public users:any=[]
  public current:any={}

  constructor( private global: GlobalService, private api:DataApiService , private toast:ToastService, private auth:LoginService) { }

  ngOnInit(): void {
    this.getTiendas();
    this.current=this.auth.getCurrentUser();
  }

  getTiendas() {
    if(this.global.getPermiso()=="user"){
      this.api.get('/getOneRow',{table:"tienda", field:"representanteId", value:this.auth.getCurrentUser().userId})
      .subscribe((tiendas:any)=>{
        this.tiendas=tiendas.data;
      })
    }
  }


}
