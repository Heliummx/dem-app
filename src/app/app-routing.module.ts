import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { DistribuidoresComponent } from './components/distribuidores/distribuidores.component';
import { LoginComponent } from './components/login/login.component';
import { ProductosTiendaComponent } from './components/productos-tienda/productos-tienda.component';
import { ProductosComponent } from './components/productos/productos.component';
import { TiendasDistribuidorComponent } from './components/tiendas-distribuidor/tiendas-distribuidor.component';
import { TiendasComponent } from './components/tiendas/tiendas.component';


const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'tiendas', component:TiendasComponent},
  {path:'distribuidores', component:DistribuidoresComponent},
  {path:'productos-tienda/:id', component:ProductosTiendaComponent},
  {path:'cuenta', component:CuentaComponent},
  {path:'productos', component:ProductosComponent},
  {path:'tiendas-distribuidor', component:TiendasDistribuidorComponent},
  {path: '',
      redirectTo: '/login',
      pathMatch: 'full'
  },
  {path: '**',
      redirectTo: '/login',
      pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
