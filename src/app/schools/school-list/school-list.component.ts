import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit, OnDestroy {

  schoolsToDisplay!: any[];
  schoolsToDisplaySubscription!: Subscription;
  
  constructor(private schoolsService: SchoolService) { }

  ngOnInit(): void {
    this.schoolsToDisplaySubscription = this.schoolsService.schoolsSubject.subscribe(
      (schoolsToDisplay: any[]) => {
        this.schoolsToDisplay = schoolsToDisplay;
      }
    );
    this.schoolsService.emitSchoolsSubject();
  }

  ngOnDestroy() {
    this.schoolsService.schoolsSubject.unsubscribe();
  }


}
