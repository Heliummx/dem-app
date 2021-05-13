import { Injectable, Directive } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class GlobalService {
    private permiso:any;
    constructor() { }
    setPermiso(val:string) {
        environment.permiso=val;
    }
    getPermiso() {
        return environment.permiso;
    }
}