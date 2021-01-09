import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SchoolService } from '../services/school.service';

@Component({
  selector: 'app-find-school',
  templateUrl: './find-school.component.html',
  styleUrls: ['./find-school.component.scss']
})
export class FindSchoolComponent implements OnInit {

  searchForm!: FormGroup;

  constructor(private schoolService: SchoolService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.searchForm = this.formBuilder.group( {
      class: [''],
      field: [''],
      region: ['']
    })
  }
  
  onSubmitForm() {
    const formValue = this.searchForm.value;
    const entryClass = formValue['class'];
    const field = formValue['field'];
    const region = formValue['region'];

    this.schoolService.searchSchool(entryClass, field, region);
    this.router.navigate(['/ecoles', 'liste-ecoles']);
  }
}
