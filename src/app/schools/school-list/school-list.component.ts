import { Component, OnInit } from '@angular/core';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit {

  constructor(private schoolService: SchoolService) { }

  ngOnInit(): void {
    this.schoolService.displaySchools() ;
  }

}
