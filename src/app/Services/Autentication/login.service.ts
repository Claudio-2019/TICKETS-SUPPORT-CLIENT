import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UsersModel } from "src/app/Interfaces/IUsers";
import { Observable } from 'rxjs';
import { AuthModel } from 'src/app/Interfaces/IAuth';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  ServerRegistroUsuario = 'https://localhost:5001/api/Register/';
  ServerAutenticacion = 'https://localhost:5001/api/Autentication/';
  ServerUsers = 'https://localhost:5001/api/Users/';
  statusSetLoginUser:any;

  constructor(private httpRequest:HttpClient) { }

  PostUserAutentication(credential:UsersModel):Observable<UsersModel>{

    this.statusSetLoginUser = this.httpRequest.post<UsersModel>(this.ServerAutenticacion,credential);

    return this.httpRequest.post<UsersModel>(this.ServerAutenticacion,credential);

  }
  PostUserRegister(user:UsersModel):Observable<UsersModel>{

    return this.httpRequest.post<UsersModel>(this.ServerRegistroUsuario,user);
    
  }

  GetUsers(){

    return this.httpRequest.get<UsersModel>(this.ServerUsers);
  }

  DeleteSelectedUser(CurrentId:string){

    return this.httpRequest.delete<string>(this.ServerUsers+CurrentId);

  }

  UpdateSelectedUser(NewUserInfo:UsersModel):Observable<UsersModel>{

    return this.httpRequest.put<UsersModel>(this.ServerUsers,NewUserInfo)

  }

  IsUser_AdminLoggingIn():Observable<string>{

    return this.statusSetLoginUser;
  }


  
}
