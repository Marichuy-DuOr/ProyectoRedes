import { Component, OnInit, Input } from '@angular/core';
import { MysqlService } from '../../services/mysql.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { GraficarService } from './../../services/graficar.service';

@Component({
  selector: 'app-receta-edamam',
  templateUrl: './receta-edamam.component.html',
  styles: []
})
export class RecetaEdamamComponent implements OnInit {

  @Input() uri: any;
  public receta;
  public bandera;

  public ejeX = [];
  public ejeY = [];

  public ejeX2 = [];
  public ejeY2 = [];

  constructor(private activatedRoute: ActivatedRoute, private mysqlService: MysqlService, private graficarService: GraficarService) {
    this.activatedRoute.params.subscribe( params => {
      this.uri = params['uri'];
    });
  }

  ngOnInit(): void {

    const elUri = this.uri.split('#');
    const body = {
      uri: elUri[1]
    };

    this.mysqlService.alta(`${environment.API_URL}/recipeEdamam`, body)
    .then((laData) => {
      console.log(laData);
    })
    .catch((err) => {
      console.log(err);
    });
  }

}
