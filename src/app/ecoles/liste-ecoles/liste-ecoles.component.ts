import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { School } from 'src/app/models/school-model';
import { SchoolService } from 'src/app/services/service-écoles.service';

@Component({
  selector: 'app-liste-ecoles',
  templateUrl: './liste-ecoles.component.html',
  styleUrls: ['./liste-ecoles.component.scss']
})
export class ListeEcolesComponent implements OnInit {
  
  schoolList!: School[];
  schoolListSubscription!: Subscription;

  constructor(private schoolService: SchoolService) { }

  ngOnInit(): void {
    this.schoolListSubscription = this.schoolService.schoolsSubject.subscribe(
      (schools: School[]) => {
        this.schoolList = schools;
      }
    );
    this.schoolService.getSchools();
    this.schoolService.emitSchoolsSubject();
  }

}
