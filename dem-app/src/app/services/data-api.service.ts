import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable()
export class DataApiService {

    constructor(public http: HttpClient, public authService: LoginService) {this.getToken();}

    public headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
    public baseURL: string = "https://afternoon-cove-64624.herokuapp.com/api"
    public token: any = "";

    public getToken() {
        this.token = localStorage.getItem("accessToken");
    }

     /**
     * Metodo get para conectarse con la api
     * @param endPoint string con el end pint a usar ej: "Usuarios/1"
     * @param useToken boolean para  intentar usar token en la peticion default: true
     */
    public get(endPoint: string, params:any): Observable<object>{
        let link: string = this.baseURL+endPoint;
        return this.http.get<JSON>(link);
    }

}