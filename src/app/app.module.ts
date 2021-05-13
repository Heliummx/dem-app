import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { LoginComponent } from './components/login/login.component';
import { TiendasComponent } from './components/tiendas/tiendas.component';
import { ProductosTiendaComponent } from './components/productos-tienda/productos-tienda.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DistribuidoresComponent } from './components/distribuidores/distribuidores.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';

// Services and utilitys
import { ToastService } from './services/toast.service';
import {ToastrModule} from 'ngx-toastr';
import { FormsModule }   from '@angular/forms';
import { GlobalService } from './services/global.service';
import { DataApiService } from './services/data-api.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductosComponent } from './components/productos/productos.component';
import { TiendasDistribuidorComponent } from './components/tiendas-distribuidor/tiendas-distribuidor.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TiendasComponent,
    ProductosTiendaComponent,
    NavbarComponent,
    FooterComponent,
    DistribuidoresComponent,
    CuentaComponent,
    ProductosComponent,
    TiendasDistribuidorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FormsModule,
    NgSelectModule
  ],
  providers: [ ToastService, GlobalService, DataApiService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
