import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent {

  public user = {
    username: '',
    password: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  }

  constructor(private userService: UserService, private nask: MatSnackBar) { }

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      this.nask.open('el nombre de usuario es requerido', 'Aceptar',{
        duration : 3000,
        verticalPosition : 'bottom',
        horizontalPosition : 'center'
      });
      return;
    }

    this.userService.añadirUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario Guardado', 'Usuario Registrado en el Sistema', 'success')
      }, (error) => {
        console.log(error);
        this.nask.open('A Ocurrido un Error en el SIstema', 'Aceptar',{
          duration : 3000,
          verticalPosition : 'bottom',
          horizontalPosition : 'center'
        });
      }
    )


  }
}
