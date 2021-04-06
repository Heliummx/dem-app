import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent implements OnInit {

  constructor( private global: GlobalService ) { }

  ngOnInit(): void {
    console.log(this.global.getPermiso())
  }

}
