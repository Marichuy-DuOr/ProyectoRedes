import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MysqlService } from '../../services/mysql.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styles: []
})
export class PerfilUsuarioComponent implements OnInit {

  public user;
  public estado;


  public editUserForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apepat: new FormControl('', Validators.required),
    apemat: new FormControl('', Validators.required),
    fecha_nac: new FormControl('', Validators.required)
  });

  constructor(private mysqlService: MysqlService) {
  }

  ngOnInit(): void {
    this.estado = '1';
    this.actualizar();
    document.getElementById('uno').style.display = 'none';
    document.getElementById('dos').style.display = 'none';
    document.getElementById('cuatro').style.display = 'none';
  }

  public actualizar() {
    this.mysqlService
      .consulta(`${environment.API_URL}/mainUser-datos`)
      .subscribe((res: any) => {
        console.log(res);
        this.user = res.array[0];
        this.editUserForm.setValue({
          nombre: this.user.nombre,
          apepat: this.user.apepat,
          apemat: this.user.apemat,
          fecha_nac: this.user.fecha_nac
        });
      });
  }

  public editUser() {
    this.estado = '2';
  }

  public regresar() {
    this.estado = '1';
  }

  public editUsuario(form) {
    if (this.editUserForm.valid) {
      if (new Date(form.fecha_nac) > new Date('1930-01-01') && new Date(form.fecha_nac) < new Date() ) {
        const body = {
          nombre: form.nombre,
          apepat: form.apepat,
          apemat: form.apemat,
          fecha_nac: form.fecha_nac
        };

        this.mysqlService.cambio(`${environment.API_URL}/user`, body)
        .subscribe((res: any) => {
          this.estado = '1';
          document.getElementById('dos').style.display = 'block';
          setTimeout(() => document.getElementById('dos').style.display = 'none', 5000);
          this.actualizar();
        });
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
