import { Component, OnInit } from '@angular/core';
import { MysqlService } from '../../services/mysql.service';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mis-recetas',
  templateUrl: './mis-recetas.component.html',
  styles: []
})
export class MisRecetasComponent implements OnInit {

  public recetas = [];

  constructor(private router: Router, public activatedRoute: ActivatedRoute, private mysqlService: MysqlService) {
  }

  ngOnInit(): void {
    this.actualizar();
  }

  public actualizar() {
    this.mysqlService.consulta(`${environment.API_URL}/userRecipesSpoonacular`)
      .subscribe((res: any) => {
        console.log(res);
        this.recetas = res.array;
        console.log(this.recetas);
      });
  }

  public eliminar(id) {
    this.mysqlService.delete(`${environment.API_URL}/userRecipeSpoonacular/${id}`)
      .subscribe((res: any) => {
        console.log(res);
        this.actualizar();
        document.getElementById('uno').style.display = 'block';
        setTimeout(() => document.getElementById('uno').style.display = 'none', 5000);
      });
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

}
