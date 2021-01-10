import { Component, OnInit } from '@angular/core';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit {

  schoolsToDisplay!: any[];
  schoolsToDisplaySubscription!: any[];
  constructor(private schoolsService: SchoolService) { }

  ngOnInit(): void {
    this.schoolsToDisplaySubscription = this.schoolsService.schoolsSubject.subscribe(
      (schoolsToDisplay: any[]) => {
        this.schoolsToDisplay = schoolsToDisplay;
      }
    );
    this.schoolsService.emitSchoolsSubject();
    this.schoolsService.displaySchools();
  }

}
