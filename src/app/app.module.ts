import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CanGuard } from './auth/guards/can-guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RecetasComponent } from './components/recetas/recetas.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { RecetaSpoonacularComponent } from './components/receta-spoonacular/receta-spoonacular.component';
import { MisRecetasComponent } from './components/mis-recetas/mis-recetas.component';
import { SimilarSpoonacularComponent } from './components/similar-spoonacular/similar-spoonacular.component';
import { RecetaEdamamComponent } from './components/receta-edamam/receta-edamam.component';
import { MisRecetasEComponent } from './components/mis-recetas-e/mis-recetas-e.component';
import { Buscador2Component } from './components/buscador2/buscador2.component';
import { IngredientesComponent } from './components/ingredientes/ingredientes.component';
import { IngredienteComponent } from './components/ingrediente/ingrediente.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PerfilUsuarioComponent,
    ToolbarComponent,
    FooterComponent,
    RecetasComponent,
    BuscadorComponent,
    RecetaSpoonacularComponent,
    MisRecetasComponent,
    SimilarSpoonacularComponent,
    RecetaEdamamComponent,
    MisRecetasEComponent,
    Buscador2Component,
    IngredientesComponent,
    IngredienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    CanGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
