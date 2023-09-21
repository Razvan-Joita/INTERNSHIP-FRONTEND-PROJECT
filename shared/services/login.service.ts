import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin, UserModel } from '../../company/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel } from '../../company/models/login.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(user: UserLogin): Observable<UserModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(`${this.baseUrl}/login`, user, httpOptions);
  }
}
