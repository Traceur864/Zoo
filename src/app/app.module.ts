import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';



// Importar nuevo modulo
import { ModuloEmailModule } from './moduleEmail/moduleemail';
import { AdminModule } from './admin/components/admin-module';

//Components
import { AppComponent } from './app.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ParquesComponent } from './components/parques/parques.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { KeepersComponent } from './components/keepers/keepers.component';
import { ProvesComponent } from './proves/proves.component';
@NgModule({ declarations: [
        AppComponent,
        TiendaComponent,
        ParquesComponent,
        AnimalsComponent,
        ContactComponent,
        HomeComponent,
        KeepersComponent,
        ProvesComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule,
        AppRoutingModule,
        ModuloEmailModule,
        AdminModule], providers: [
        
    ] })
export class AppModule { }
