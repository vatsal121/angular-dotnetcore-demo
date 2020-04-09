import { Component } from '@angular/core';
import { loginInfo } from '../../type/loginInfo.type';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';
import { MustMatchDirective } from '../../directive/must-match.directive';
import { RegisterService } from '../../service/register/register.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  providers: [RegisterService]
})
export class RegisterComponent {

  model : loginInfo;
  constructor(public route : Router,public toastr :ToastrService,private _registerService : RegisterService) { 
    this.model  = new loginInfo();
  }
  onSubmit() {
    debugger
    this._registerService.register(this.model).subscribe(res =>{
      debugger
      if (res == "Invalid") {
        this.toastr.error("Registration failed.", "Registration")
      }
      else {
        this.route.navigate(['/login']);
        this.toastr.success("Registration successfully", "Registration")
      }
    },(error)=>{
      debugger
      console.error(error);
      this.toastr.error("Registration failed, Please do it again.", "Registration", {
        timeOut: 2000
      })
    })
  }
}
