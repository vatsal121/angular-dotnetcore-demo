import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../environments/environment';
const httpreq = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  public login(_userData) {
    debugger
    return this.httpClient.post(
      environment.REST_API_SERVER + "user/token",
      JSON.stringify(_userData),{headers:httpreq})
  }
}
