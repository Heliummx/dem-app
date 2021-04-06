import { Injectable,ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class ToastService {

  constructor(public toastr: ToastrService) {    
	}

	showSuccess(msg:any) {
    return this.toastr.success(msg, 'Correcto');
  }
    
  showError(msg:any) {
    return this.toastr.error(msg, 'Error');
  }
    
  showWarning(msg:any) {
    return this.toastr.warning(msg, 'Alerta!');
  }
    
  showInfo(msg:any) {
    return this.toastr.info(msg);
  }
}