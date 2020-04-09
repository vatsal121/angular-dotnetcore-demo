import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const httpreq = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public httpClient: HttpClient) { }

  public register(_userDetails) {
    return this.httpClient.post(
      environment.REST_API_SERVER + "user/PostUser",JSON.stringify(_userDetails),{headers:httpreq});
  }
}
