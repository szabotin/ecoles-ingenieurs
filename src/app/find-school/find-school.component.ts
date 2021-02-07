import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { SchoolService } from '../services/school.service';
import { Region } from '../interfaces/region.interface';
import { Domaine } from '../interfaces/domain.interface';
import { Niveau } from '../interfaces/niveau.interface';

@Component({
  selector: 'app-find-school',
  templateUrl: './find-school.component.html',
  styleUrls: ['./find-school.component.scss']
})
export class FindSchoolComponent implements OnInit {

  latitude = 45.000000;
  longitude = 0.000000;

  searchForm!: FormGroup;

  niveaux: Niveau[] = [];
  regions: Region[] = [];
  domaines: Domaine[] = [];

  constructor(private schoolService: SchoolService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.schoolService.getRegionForSelector().pipe(take(1)).subscribe(regions => this.regions = regions);
    this.schoolService.getDomaineForSelector().pipe(take(1)).subscribe(domaines => this.domaines = domaines);
    this.schoolService.getNiveauForSelector().pipe(take(1)).subscribe(niveaux => this.niveaux = niveaux);
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
