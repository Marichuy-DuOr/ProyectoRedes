import { Component, OnInit, Input } from '@angular/core';
import { MysqlService } from '../../services/mysql.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-similar-spoonacular',
  templateUrl: './similar-spoonacular.component.html',
  styles: []
})
export class SimilarSpoonacularComponent implements OnInit {

  @Input() idReceta: any;
  public recetas = [];

  constructor(private activatedRoute: ActivatedRoute, private mysqlService: MysqlService) {
    this.activatedRoute.params.subscribe( params => {
      this.idReceta = params['id_receta'];
    });
  }

  ngOnInit(): void {
    this.actualizar();
  }

  public actualizar() {
    this.mysqlService.consulta(`${environment.API_URL}/similarSpoonacular/${this.idReceta}`)
      .subscribe((res: any) => {
        console.log(res);
        this.recetas = res;
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
