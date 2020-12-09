import { Component, OnInit } from '@angular/core';
import { MysqlService } from '../../services/mysql.service';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mis-recetas-e',
  templateUrl: './mis-recetas-e.component.html',
  styles: []
})
export class MisRecetasEComponent implements OnInit {

  public recetas = [];

  constructor(private router: Router, 
    public activatedRoute: ActivatedRoute, 
    private mysqlService: MysqlService) {
  }

  ngOnInit(): void {
    this.actualizar();
  }

  public actualizar() {
    this.recetas=[];
    this.mysqlService.consulta(`${environment.API_URL}/userRecipesEdamam`)
      .subscribe((res: any) => {
        console.log(res.array);

        this.recetas = res.array;
    });
  }

  public eliminar(id) {
    this.mysqlService.delete(`${environment.API_URL}/userRecipeEdamam/${id}`)
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
