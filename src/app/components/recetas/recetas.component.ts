import { Component, OnInit } from '@angular/core';
import { MysqlService } from '../../services/mysql.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styles: []
})
export class RecetasComponent implements OnInit {

  public recetas = [];
  public band;

  constructor(private mysqlService: MysqlService) {
  }

  ngOnInit(): void {
    this.actualizar();
    this.band = true;
  }

  public actualizar() {
    this.mysqlService.consulta(`${environment.API_URL}/randomSpoonacular`)
      .subscribe((res: any) => {
        this.recetas = res.recipes;
      });
  }

  buscar(busqueda: string) {
    // this.router.navigate(['/buscador', busquedaEdaman]);
    this.recetas = [];
    this.mysqlService.consulta(`${environment.API_URL}/buscarSpoonacular/${busqueda}`)
      .subscribe((res: any) => {
        this.recetas = res.results;
        if (this.recetas.length > 0) {
          this.band = true;
        } else {
          this.band = false;
        }
      });
  }

  public agregar(receta) {
    this.mysqlService.consulta(`${environment.API_URL}/userRecipeSpoonacular/${receta.id}`)
      .subscribe((res: any) => {
        if (res.array.length > 0) {
          document.getElementById('dos').style.display = 'block';
          setTimeout(() => document.getElementById('dos').style.display = 'none', 2000);
        } else {
          const data = {
            id_receta: receta.id,
            title: receta.title,
            image: receta.image,
            creditsText: receta.creditsText,
          };
          this.mysqlService.alta(`${environment.API_URL}/userRecipeSpoonacular`, data)
          .then((laData) => {
            console.log(laData);
            document.getElementById('uno').style.display = 'block';
            setTimeout(() => document.getElementById('uno').style.display = 'none', 2000);
          })
          .catch((err) => {
            console.log(err);
          });
        }
      });
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

}
