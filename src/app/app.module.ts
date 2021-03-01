import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FindSchoolComponent } from './find-school/find-school.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingleSchoolComponent } from './schools/single-school/single-school.component';
import { SchoolListComponent } from './schools/school-list/school-list.component';
import { SchoolService } from './services/school.service';
import { AgmCoreModule } from '@agm/core';
import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';

const appRoutes: Routes = [
  { path: 'page-principale', component: FindSchoolComponent },
  { path: 'ecoles/liste-ecoles', component: SchoolListComponent},
  { path: 'ecoles/ecole-simple', component: SingleSchoolComponent},
  { path: 'auth', component: AuthComponent},
  { path: '', component: FindSchoolComponent},
  { path: '**', redirectTo: 'page-principale'},
]

@NgModule({
  declarations: [
    AppComponent,
    FindSchoolComponent,
    HeaderComponent,
    SingleSchoolComponent,
    SchoolListComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBj6XhSv0hxXXXsITITjdzG-mqOK8dde8k'
    }),
    BrowserAnimationsModule,
    MatSliderModule,
    MatGridListModule
  ],
  providers: [SchoolService],
  bootstrap: [AppComponent]
})
export class AppModule { }
