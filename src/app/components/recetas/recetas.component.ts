import { Component, OnInit } from '@angular/core';
import { MysqlService } from '../../services/mysql.service';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styles: []
})
export class RecetasComponent implements OnInit {

  public recetas = [];

  constructor(private router: Router, public activatedRoute: ActivatedRoute, private mysqlService: MysqlService) {
    /*this.activatedRoute.params.subscribe( params => {
      // parametros para cuando quieras poner recetas aleatorias no tan aleatorias xd
    });*/
  }

  ngOnInit(): void {
    this.actualizar();
  }

  public actualizar() {
    this.mysqlService.consulta(`${environment.API_URL}/randomSpoonacular`)
      .subscribe((res: any) => {
        console.log(res);
        this.recetas = res.recipes;
        console.log(this.recetas);
      });
  }

  public agregar(receta) {
    this.mysqlService.consulta(`${environment.API_URL}/userRecipeSpoonacular/${receta.id}`)
      .subscribe((res: any) => {
        if (res.array.length > 0){
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
