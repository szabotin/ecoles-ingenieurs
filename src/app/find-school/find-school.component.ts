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
      classe: [''],
      domaine: [''],
      region: ['']
    })
  }
  
  onRecherche() {
    // this.schoolService.getSchoolFromRegion()
    console.log(this.searchForm);
    this.router.navigate(['/ecoles', 'liste-ecoles']);
  }
}
