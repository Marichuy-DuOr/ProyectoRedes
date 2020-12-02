import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  public newUserForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    apepat: new FormControl('', Validators.required),
    apemat: new FormControl('', Validators.required),
    fecha_nac: new FormControl('', Validators.required),
    contrasenaVerf: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, private router: Router) {
    this.newUserForm.setValue({
      nombre: '',
      email: '',
      password: '',
      apepat: '',
      apemat: '',
      fecha_nac: '',
      contrasenaVerf: ''
    });
  }


  ngOnInit(): void {
    document.getElementById('uno').style.display = 'none';
    document.getElementById('dos').style.display = 'none';
    document.getElementById('tres').style.display = 'none';
    document.getElementById('cuatro').style.display = 'none';
  }

  public newUser(form) {
    if (this.newUserForm.valid) {
      if ( new Date(form.fecha_nac) > new Date('1930-01-01') && new Date(form.fecha_nac) < new Date() ) {
        const body = {
          nombre: form.nombre,
          email: form.email,
          password: form.password,
          apepat: form.apepat,
          apemat: form.apemat,
          fecha_nac: form.fecha_nac
        };
        if (body.password === form.contrasenaVerf) {
          this.authService.register(body).then((data) => {
            console.log(data);
            if (!data['success']) {
              document.getElementById('tres').style.display = 'block';
              setTimeout(() => document.getElementById('tres').style.display = 'none', 5000);
            } else {
              this.router.navigate(['/login']);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        } else {
          document.getElementById('dos').style.display = 'block';
          setTimeout(() => document.getElementById('dos').style.display = 'none', 5000);
        }
      } else {
        document.getElementById('cuatro').style.display = 'block';
        setTimeout(() => document.getElementById('cuatro').style.display = 'none', 5000);
      }
    } else {
      document.getElementById('uno').style.display = 'block';
      setTimeout(() => document.getElementById('uno').style.display = 'none', 5000);
    }

  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

}
