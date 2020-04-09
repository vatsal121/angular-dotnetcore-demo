import { Component } from '@angular/core';
import { loginInfo } from '../../type/loginInfo.type';
import { LoginService } from '../../service/login/login.service';
import { routes } from '../../app.routing';
import { RouterLink, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  providers: [LoginService]
})
export class LoginComponent {
  _loginModel: loginInfo;
  constructor(public _loginService: LoginService, public route: Router, private toastr: ToastrService) {
    this._loginModel = new loginInfo();
  }
  login() {
    debugger
    //this._loginInfo.email = "InventoryAdmin@abc.com";
    //this._loginInfo.password = "$admin@2017";
    this._loginService.login(this._loginModel).subscribe(res => {
      debugger
      if (res == "Invalid") {
        this.toastr.error("Login failed, Please enter valid credentials", "Login")
      }
      else {
        this.route.navigate(['/dashboard']);
        this.toastr.success("Login successfully", "Login")
      }
    },
      (error) => {
        debugger
        console.error(error);
        this.toastr.error("Login failed, Please do it again.", "Login", {
          timeOut: 2000
        })
      })
  }
}
