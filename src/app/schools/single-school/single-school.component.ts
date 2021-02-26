import { Component, OnInit } from '@angular/core';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-single-school',
  templateUrl: './single-school.component.html',
  styleUrls: ['./single-school.component.scss']
})
export class SingleSchoolComponent implements OnInit {

  constructor(private schoolService: SchoolService) { }

  ngOnInit(): void {
    //this.schoolService.getSingleSchool();
  }



}
