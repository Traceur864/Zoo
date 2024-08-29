import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//Components
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminAddComponent } from "./admin-add/admin-add.component";
import { AdminEditComponent } from "./admin-edit/admin-edit.component";
import { AdminListComponent } from "./admin-list/admin-list.component";

const AdminRoutes: Routes = [
    {path: 'admin-panel', component: AdminMainComponent, 
    children:[
        { path: '', redirectTo: 'listado', pathMatch: 'full'},
        { path: 'listado', component: AdminListComponent},
        { path: 'crear', component: AdminAddComponent},
        { path: 'editar', component: AdminEditComponent}
    ]},
    { path: 'listado-del-panel', component: AdminListComponent}
  ];

@NgModule({
    imports: [RouterModule.forChild(AdminRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }