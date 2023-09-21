import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RoleModel } from '../../company/models/role.model';
import { environment } from 'src/environment/environment';

@Injectable()
export class RoleService {

  private baseUrl = environment.apiUrl + '/api/company/roles';

  constructor(private http: HttpClient) {
  }

  addRole(role: RoleModel): Observable<RoleModel> {
    return this.http.post<RoleModel>(this.baseUrl, role);
  }

  getRole(roleId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${roleId}`);
  }

  updateRole(roleId: number, updatedData: RoleModel): Observable<RoleModel> {
    return this.http.put<RoleModel>(`${this.baseUrl}/${roleId}`, updatedData);
  }

  deleteRole(roleId: number): Observable<number> {
    return this.http.delete<number>(`${this.baseUrl}/${roleId}`);
  }


  getAllRoles(): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(this.baseUrl); 
  }
  
}

