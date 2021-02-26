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
import { Departement } from '../interfaces/departement.interface';
import { TypeEntree } from '../interfaces/typeEntree.interfacee';

@Component({
  selector: 'app-find-school',
  templateUrl: './find-school.component.html',
  styleUrls: ['./find-school.component.scss']
})
export class FindSchoolComponent implements OnInit {

  searchForm!: FormGroup;

  advancedSearch: boolean = false;

  latitude = 46.227638;
  longitude = 2.213749;

  ecoles: Ecole[] = [];
  niveaux: NiveauEntree[] = [];
  regions: Region[] = [];
  departements: Departement[] = [];
  domaines: Domaine[] = [];
  types: TypeEntree[] = [];

  constructor(private schoolService: SchoolService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.schoolService.getRegionForSelector().pipe(take(1)).subscribe(regions => this.regions = regions);
    this.schoolService.getDomaineForSelector().pipe(take(1)).subscribe(domaines => this.domaines = domaines);
    this.schoolService.getNiveauForSelector().pipe(take(1)).subscribe(niveaux => this.niveaux = niveaux);
    this.schoolService.getDepartementForSelector().pipe(take(1)).subscribe(departements => this.departements = departements);
    this.schoolService.getTypeForSelector().pipe(take(1)).subscribe(types => this.types = types);

    this.searchForm.controls.department.disable();
    this.searchForm.controls.level.disable();
  }

  initForm() {
    this.searchForm = this.formBuilder.group( {
      class: [''],
      field: [''],
      region: [''],
      department: [''],
      level: ['']
    })
  }

  onSubmitForm() {
    let formValue = this.searchForm.value;
    let entryClass = formValue['class'];
    let field = formValue['field'];
    let region = formValue['region'];
    let department = formValue['department'];
    let level = formValue['level'];

    if(!this.advancedSearch)
    {
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
    }  
    else
    {
      if(department != '')
      {
        this.schoolService.getSchoolFromDepartement(department.idDepartement).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
      }
      else{
        if(level != '')
        {
          this.schoolService.getSchoolFromTypeEntree(level.idTypeEntree).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
        }
      }
    }   

       
    
    //this.router.navigate(['/ecoles', 'liste-ecoles']);
  }


  //GoogleMaps Events
  agmMouseOver(infoWindow: AgmInfoWindow, event: google.maps.MouseEvent)
  {
    infoWindow.open();
  }

  agmMouseOut(infoWindow: AgmInfoWindow, event: google.maps.MouseEvent)
  {

    infoWindow.close();
  }

  agmMarkerClick(ecole: Ecole)
  {
    if(ecole.urlSite != null)
      window.open(ecole.urlSite);
  }


  //Form Events
  onRegionChange()
  {
    let region = this.searchForm.value['region'];
    if(region == '')
    {
      this.schoolService.getDepartementForSelector().pipe(take(1)).subscribe(departements => this.departements = departements);
    }
    else
    {
      this.schoolService.getDepartementFromRegion(region.idRegion).pipe(take(1)).subscribe(departements => this.departements = departements);
    }    
  }

  //Button Events
  toggleAdvancedSearch()
  {
    if(!this.advancedSearch)
    {
      this.searchForm.controls.department.enable();
      this.searchForm.controls.level.enable();

      this.advancedSearch = !this.advancedSearch;
    }
    else
    {
      this.searchForm.controls.department.disable();
      this.searchForm.controls.level.disable();

      this.advancedSearch = !this.advancedSearch;
      
      this.searchForm.controls.department.reset();
      this.searchForm.controls.level.reset();
    }
  }
}
