import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
=======
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
>>>>>>> a6219970dab3fc6ab5a713d0084503d244244c6d
import { Router } from '@angular/router';
import { AuthModel } from 'src/app/Interfaces/IAuth';
import { UsersModel } from 'src/app/Interfaces/IUsers';
import { LoginService } from 'src/app/Services/Autentication/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //Formularios
  FormRegistroUser: FormGroup;
  FormLogin: FormGroup;

  //Componentes del formulario de registro
  private FormName = new FormControl();
  private FormLastName = new FormControl();
  private FormPhone = new FormControl();
  private FormEmail = new FormControl();
  private FormPass = new FormControl();

  //Componentes del formulario de Login
  private FormUserEmail = new FormControl();
  private FormUserPass = new FormControl();

  //variables dinamicas
<<<<<<< HEAD
  private rolUser: string = "User";
=======
  private rolUser: string = 'Usuario Corriente';
>>>>>>> a6219970dab3fc6ab5a713d0084503d244244c6d
  statusRegistro: any;
  statusLoginIncorrecto: any;
  statusLoginCorrecto: any;
  statusLoginGUI: boolean = true;
  CurrentLocalStorageState: string;
  codeErrorGUI: string;

<<<<<<< HEAD
  constructor(private BuilderRegistroForm: FormBuilder, private BuilderLoginForm: FormBuilder, private WebServiceUser: LoginService,private enrutamiento:Router) {

=======
  constructor(
    private BuilderRegistroForm: FormBuilder,
    private BuilderLoginForm: FormBuilder,
    private WebServiceUser: LoginService,
    private navegacionRouter:Router
  ) {
>>>>>>> a6219970dab3fc6ab5a713d0084503d244244c6d
    this.FormRegistroUser = this.BuilderRegistroForm.group({
      FormName: ['', Validators.required],
      FormLastName: ['', Validators.required],
      FormPhone: ['', Validators.required],
      FormEmail: ['', Validators.required],
      FormPass: ['', Validators.required],
    });

    this.FormLogin = this.BuilderLoginForm.group({
      FormUserEmail: ['', Validators.required],
      FormUserPass: ['', Validators.required],
    });
  }

  async ServiceRegistroUsuario() {
    const registro: UsersModel = {
      Name: this.FormRegistroUser.get('FormName').value,
      LastName: this.FormRegistroUser.get('FormLastName').value,
      Phone: this.FormRegistroUser.get('FormPhone').value,
      Email: this.FormRegistroUser.get('FormEmail').value,
      Pass: this.FormRegistroUser.get('FormPass').value,
<<<<<<< HEAD
      Role: this.rolUser
    }

    this.WebServiceUser.PostUserRegister(registro).subscribe(result => {


    }, (RegistroCompleto: any) => {
      this.statusRegistro = true;

    })

  }

  async ServiceAutentication() {

    this.statusLoginIncorrecto = false;

    const credentials: UsersModel = {

      Email: this.FormLogin.get('FormUserEmail').value,
      Pass: this.FormLogin.get('FormUserPass').value,
      LastName:"",
      Name:"",
      Phone:"",
      Role:"Admin",
      id:""
      
    }

    this.WebServiceUser.PostUserAutentication(credentials).subscribe(
      (result:any) => {
        alert("Solicitud: "+ JSON.stringify(result))
      },
      (error:HttpErrorResponse) =>{
        
        alert(JSON.stringify(error.error));

        this.statusLoginIncorrecto = true;

        this.enrutamiento.navigate(['/TicketsSupportModule']);

      }
    )

   

  }

  ngOnInit(): void {
=======
      Rol: this.rolUser,
    };

    this.WebServiceUser.PostUser(registro).subscribe(
      (result) => {},
      (RegistroCompleto: any) => {
        this.statusRegistro = true;
      }
    );
  }

  ServiceAutentication() {
    const registro: AuthModel = {
      Email: this.FormLogin.get('FormUserEmail').value,
      Pass: this.FormLogin.get('FormUserPass').value,
    };

    this.WebServiceUser.PostAuth(registro).subscribe(
      (start) => {
        alert(JSON.stringify(start));
      },
      
    );
>>>>>>> a6219970dab3fc6ab5a713d0084503d244244c6d
  }

  ngOnInit() {}
}
