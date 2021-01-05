import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EcoleSimpleComponent } from './ecoles/ecole-simple/ecole-simple.component';
import { FindSchoolComponent } from './find-school/find-school.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { ListeEcolesComponent } from './ecoles/liste-ecoles/liste-ecoles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: 'page-principale', component: FindSchoolComponent },
  { path: 'ecoles/liste-ecoles', component: ListeEcolesComponent},
  { path: 'ecoles/ecole-simple', component: EcoleSimpleComponent},
  { path: '', component: FindSchoolComponent},
  { path: '**', redirectTo: 'page-principale'},


]

@NgModule({
  declarations: [
    AppComponent,
    EcoleSimpleComponent,
    FindSchoolComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
