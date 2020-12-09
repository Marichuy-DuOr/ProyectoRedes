import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MysqlService } from './../../services/mysql.service';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styles: []
})
export class BuscadorComponent implements OnInit {

  public recetas;
  public busqueda;

  constructor( public activatedRoute: ActivatedRoute, private mysqlService: MysqlService ) {

    this.activatedRoute.params.subscribe( params => {
      this.busqueda = params['busquedaEdaman'];
      this.actualizar();
    });

  }

  ngOnInit(): void {
  }

  public actualizar() {
    this.mysqlService.consulta(`${environment.API_URL}/buscarEdaman/${this.busqueda}`)
      .subscribe((res: any) => {
        console.log(res.hits);
        this.recetas = res.hits;
      });
  }

  public agregar(receta) {
    const elUri = receta.recipe.uri.split('#');
    const uri_receta= elUri[1];
    console.log(uri_receta);
    this.mysqlService.consulta(`${environment.API_URL}/userRecipeEdamam/${uri_receta}`)
      .subscribe((res: any) => {
        console.log(res.array);
        if (res.array.length > 0){
          this.mysqlService.delete(`${environment.API_URL}/userRecipeEdamam/${res.array[0].id}`)
          .subscribe((res2: any) => {
            document.getElementById('dos').style.display = 'block';
            setTimeout(() => document.getElementById('dos').style.display = 'none', 2000);
          });
        } else {
          
          const data = {
            uri_receta: elUri[1],
            label: receta.recipe.label,
            source: receta.recipe.source,
            image: receta.recipe.image
          };
          this.mysqlService.alta(`${environment.API_URL}/userRecipeEdamam`, data)
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
