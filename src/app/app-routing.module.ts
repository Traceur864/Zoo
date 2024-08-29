import { NgModule, ModuleWithProviders, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { TiendaComponent } from './components/tienda/tienda.component';
import { ParquesComponent } from './components/parques/parques.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { KeepersComponent } from './components/keepers/keepers.component';
import { ProvesComponent } from './proves/proves.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'animales', component: AnimalsComponent},
  {path: 'contacto', component: ContactComponent},
  {path: 'cuidadores', component: KeepersComponent},
  {path: 'tienda', component: TiendaComponent},
  {path: 'calculadora', component:ProvesComponent},
  {path: ' * * ', component: HomeComponent}
  /* {path: 'Sobre-mi', component: AboutComponent},
  {path: 'Proyectos', component: ProjectsComponent},
  {path: 'Crear-proyecto',component: CreateComponent},
  {path: 'Contacto', component: ContactComponent},
  {path: 'proyecto/:id', component: DetailComponent},
  {path: 'Editar/:id', component: EditComponent}, */
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
