import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = {
    username: '',
    password: '',
  };

  constructor(
    private snack: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) {}

  formSubmit() {
    console.log(this.loginData);
    if (
      this.loginData.username.trim() === '' ||
      this.loginData.username.trim() === null
    ) {
      this.snack.open('El nombre de usuario es requerido', 'Aceptar', {
        duration: 3000,
      });
      return;
    }

    if (
      this.loginData.password.trim() === '' ||
      this.loginData.password.trim() === null
    ) {
      this.snack.open('El nombre de usuario es requerido', 'Aceptar', {
        duration: 3000,
      });
      return;
    }

    this.loginService
      .generateToken(
        this.loginData,
        this.loginData.username,
        this.loginData.password
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          this.loginService.loginUser(data.token);
          this.loginService.getCurrentUser().subscribe((user: any) => {
            this.loginService.setUser(user);
            if (this.loginService.getUserRole() == 'ADMIN') {
              this.router.navigateByUrl('/admin');
            } else if (this.loginService.getUserRole() == 'NORMAL') {
              this.router.navigateByUrl('/user-dashboard');
            } else {
              this.loginService.logout()
            }
          });
        },
        (error) => {
          console.log(error);
          this.snack.open('Detalles Invalidos Vuelva a intentar','Aceptar',{
            duration : 3000
          });
        }
      );
  }
}
