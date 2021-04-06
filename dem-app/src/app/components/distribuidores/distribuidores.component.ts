import { Component, OnInit } from '@angular/core';
import {DataApiService} from '../../services/data-api.service';

@Component({
  selector: 'app-distribuidores',
  templateUrl: './distribuidores.component.html',
  styleUrls: ['./distribuidores.component.css']
})
export class DistribuidoresComponent implements OnInit {

  constructor(public api:DataApiService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this.api.get('/getUsersWithCredentials', {where:{realm:'user',active:true}})
    .subscribe((usuarios:any)=>{
      console.log(usuarios)
    })
  }

}
