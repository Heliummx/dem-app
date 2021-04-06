import { Injectable, Directive } from '@angular/core';
@Injectable()
export class GlobalService {
    private permiso:any;
    constructor() { }
    setPermiso(val:string) {
        this.permiso = val;
    }
    getPermiso() {
        return this.permiso;
    }
}