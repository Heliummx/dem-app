import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class DataApiService {

    constructor(public http: HttpClient, public authService: LoginService) {this.getToken();}

    //public headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
    public baseURL: string = environment.api_url
    public token: any = "";

    public getToken() {
        this.token = localStorage.getItem("accessToken");
    }

    private options:any={
            responseType:"json",
            headers:{ 'Content-Type': 'application/json', 'authorization':' '},
            body:{}
    }

    public get(endPoint: string, params:any): Observable<object>{
        this.options.headers.authorization='Bearer ' + this.token
        this.options.params=params
        let link: string = this.baseURL+endPoint;
        return this.http.request('GET', link, this.options);
    }

    public post(endPoint: string, params:any): Observable<object>{
        this.options.headers.authorization='Bearer ' + this.token
        this.options.body=params
        let link: string = this.baseURL+endPoint;
        return this.http.request('POST', link, this.options); 
    }
}