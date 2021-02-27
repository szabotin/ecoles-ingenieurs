import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { SchoolService } from '../services/school.service';
import { Region } from '../interfaces/region.interface';
import { Domaine } from '../interfaces/domain.interface';
import { NiveauEntree } from '../interfaces/niveauEntree.interface';
import { Ecole } from '../interfaces/ecole.interface';
import { AgmInfoWindow } from '@agm/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-find-school',
  templateUrl: './find-school.component.html',
  styleUrls: ['./find-school.component.scss']
})
export class FindSchoolComponent implements OnInit {

  searchForm!: FormGroup;

  loginUserData = {};

  latitude = 46.227638;
  longitude = 2.213749;

  ecoles: Ecole[] = [];
  niveaux: NiveauEntree[] = [];
  regions: Region[] = [];
  domaines: Domaine[] = [];

  constructor(private schoolService: SchoolService,
              private formBuilder: FormBuilder,
              private router: Router, 
              private auth: AuthService) { }

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

  loginUser() {
    this.auth.loginUser(this.loginUserData).subscribe (
      res => console.log(res),
      err => console.log(err)
    )
  }

  onSubmitForm() {
    const formValue = this.searchForm.value;
    const entryClass = formValue['class'];
    const field = formValue['field'];
    const region = formValue['region'];

    if(field == '')
    {
      if(region == '')
      {
        if(entryClass == '')
        {
          this.schoolService.getAllSchool().pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
        }
        else
        {
          this.schoolService.getSchoolFromNiveauEntree(entryClass.idNivEntree).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
        }
      }
      else
      {
        if(entryClass == '')
        {
          this.schoolService.getSchoolFromRegion(region.idRegion).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
        }
        else
        {
          this.schoolService.getSchoolFromNiveauRegion(entryClass.idNivEntree, region.idRegion).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
        }
      }
    }
    else
    {
      if(region == '')
      {
        if(entryClass == '')
        {
          this.schoolService.getSchoolFromDomaine(field.idDomaine).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
        }
        else
        {
          this.schoolService.getSchoolFromNiveauDomaine(entryClass.idNivEntree, field.idDomaine).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
        }
      }
      else
      {
        if(entryClass == '')
        {
          this.schoolService.getSchoolFromRegionDomaine(region.idRegion, field.idDomaine).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
        }
        else
        {
          this.schoolService.getSchoolFromFilters(field.idDomaine, region.idRegion, entryClass.idNivEntree).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
        }
      }
    }    
    
    //this.router.navigate(['/ecoles', 'liste-ecoles']);
  }


  mouseOver(infoWindow: AgmInfoWindow, event: google.maps.MouseEvent)
  {
    infoWindow.open();
  }

  mouseOut(infoWindow: AgmInfoWindow, event: google.maps.MouseEvent)
  {

    infoWindow.close();
  }

  markerClick(ecole: Ecole)
  {
    if(ecole.urlSite != null)
      window.open(ecole.urlSite);
  }


}
