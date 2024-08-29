import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common"; 
import { FormsModule } from '@angular/forms';

import { GuardarEmailComponent } from "./components/guardar-email/guardar-email.component";
import { MostrarEmailComponent } from "./components/mostrar-email/mostrar-email.component";
import { MainEmailComponent } from "./components/main-email/main-email.component";

// decorador ngModule para cargar los compoinentes y la configuración de modulos

@NgModule({
    imports: [  CommonModule,
                FormsModule],
    declarations: [
        GuardarEmailComponent,
        MostrarEmailComponent,
        MainEmailComponent
    ],
    exports: [MainEmailComponent]
})
export class ModuloEmailModule { }