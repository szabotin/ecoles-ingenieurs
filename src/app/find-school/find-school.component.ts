import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { SchoolService } from '../services/school.service';
import { Region } from '../interfaces/region.interface';
import { Domaine } from '../interfaces/domaine.interface';
import { NiveauEntree } from '../interfaces/niveauEntree.interface';
import { Ecole } from '../interfaces/ecole.interface';
import { AgmInfoWindow } from '@agm/core';
import { Departement } from '../interfaces/departement.interface';
import { TypeEntree } from '../interfaces/typeEntree.interface';

@Component({
  selector: 'app-find-school',
  templateUrl: './find-school.component.html',
  styleUrls: ['./find-school.component.scss']
})
export class FindSchoolComponent implements OnInit {

  longitude: number = 2.213749;
  latitude: number = 46.727638;

  searchForm!: FormGroup;

  advancedSearch: boolean = false;

  ecoles: Ecole[] = [];
  niveaux: NiveauEntree[] = [];
  regions: Region[] = [];
  departements: Departement[] = [];
  domaines: Domaine[] = [];
  types: TypeEntree[] = [];

  fees = [
    {
      borneInf: -1,
      borneSupp: 750,
      text: "moins de 750€" 
    },
    {
      borneInf: 750,
      borneSupp: 1500,
      text: "entre 751 et 1500€" 
    },
    {
      borneInf: 1500,
      borneSupp: 3000,
      text: "entre 1501 et 3000€" 
    },
    {
      borneInf: 3000,
      borneSupp: 5000,
      text: "entre 3001 et 5000€" 
    },
    {
      borneInf: 5000,
      borneSupp: 10000,
      text: "entre 5001 et 10 000€" 
    },
    {
      borneInf: 10000,
      borneSupp: 15000,
      text: "entre 10 001 et 15 000€" 
    },
    {
      borneInf: 15000,
      borneSupp: 500000,
      text: "plus de 15 000€" 
    },
  ];

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
    this.searchForm.controls.type.disable();
    this.searchForm.controls.fee.disable();
  }

  initForm() {
    this.searchForm = this.formBuilder.group( {
      class: [''],
      field: [''],
      region: [''],
      department: [''],
      type: [''],
      fee: ['']
    })
  }

  onSubmitForm() {
    let formValue = this.searchForm.value;

    let entryClass;
    if(formValue['class'] != '')
      entryClass = formValue['class'].idNivEntree;
    else  
      entryClass = null;
    
    let field;
    if(formValue['field'] != '')
      field = formValue['field'].idDomaine;
    else
      field = null;
    
    let region;
    if(formValue['region'] != '')
      region = formValue['region'].idRegion;
    else
      region = null;

    if(!this.advancedSearch){
      this.schoolService.getSchoolFromSimpleResearch(entryClass, field, region).subscribe(ecoles => this.ecoles = ecoles);
    }
    else{
      let department;
      if(formValue['department'] != '' && formValue['department'] != null)
        department = formValue['department'].idDepartement;
      else
        department = null;
      
      let type;
      if(formValue['type'] != '' && formValue['type'] != null)
        type = formValue['type'].idTypeEntree;
      else
        type = null;
      
      let borneInf = null;
      let borneSup = null;
      if(formValue['fee'] != '' && formValue['fee'] != null){
        borneInf = formValue['fee'].borneInf;
        borneSup = formValue['fee'].borneSupp;
      }

      if(department == null){
        this.schoolService.getSchoolFromAdvancedResearchV1(entryClass, field, region, type, borneInf, borneSup).subscribe(ecoles => this.ecoles = ecoles);
      }
      else{
        this.schoolService.getSchoolFromAdvancedResearchV2(entryClass, field, department, type, borneInf, borneSup).subscribe(ecoles => this.ecoles = ecoles);
      }
    }
    
    


   
    

    //------------------------------------If/Else structure to choose the backend query----------------------------------
   /* if(!this.advancedSearch){
      if(field == ''){
        if(region == ''){
          if(entryClass == ''){
            this.schoolService.getAllSchool().pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
          }
          else{
            this.schoolService.getSchoolFromNiveauEntree(entryClass.idNivEntree).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
          }
        }
        else{
          if(entryClass == ''){
            this.schoolService.getSchoolFromRegion(region.idRegion).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
          }
          else{
            this.schoolService.getSchoolFromNiveauRegion(entryClass.idNivEntree, region.idRegion).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
          }
        }
      }
      else{
        if(region == ''){
          if(entryClass == ''){
            this.schoolService.getSchoolFromDomaine(field.idDomaine).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
          }
          else{
            this.schoolService.getSchoolFromNiveauDomaine(entryClass.idNivEntree, field.idDomaine).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
          }
        }
        else{
          if(entryClass == ''){
            this.schoolService.getSchoolFromRegionDomaine(region.idRegion, field.idDomaine).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
          }
          else{
            this.schoolService.getSchoolFromDomaineRegionNiveau(field.idDomaine, region.idRegion, entryClass.idNivEntree).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
          }
        }
      } 
    }  
    else{
      if(department == ''){
        if(region == ''){
          if(entryClass == ''){
            if(field == ''){
              if(type == ''){
                if(fee == ''){
                  this.schoolService.getAllSchool().pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
                }
                else{
                  this.schoolService.getSchoolFromFrais(fee.borneInf, fee.borneSupp).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles); 
                }
              } 
              else{
                if(fee == ''){
                  this.schoolService.getSchoolFromTypeEntree(type.idTypeEntree).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
                }
                else{
                  this.schoolService.getSchoolFromTypeFrais(type.idTypeEntree, fee.borneInf, fee.borneSupp).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
                }
              }
            }
            else{
              if(type == ''){
                if(fee == ''){
                  this.schoolService.getSchoolFromDomaine(field.idDomaine).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
                }
                else{
                  this.schoolService.getSchoolFromDomaineFrais(field.idDomaine, fee.borneInf, fee.borneSupp).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
                }
              } 
              else{
                if(fee == ''){
                  this.schoolService.getSchoolFromTypeDomaine(type.idTypeEntree, field.idDomaine).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
                }
                else{
                  this.schoolService.getSchoolFromDomaineTypeFrais(field.idDomaine, type.idTypeEntree, fee.borneInf, fee.borneSupp).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
                }
              }
            }
          }
          else{
            if(field == ''){
              if(type == ''){
                if(fee == ''){
                  this.schoolService.getSchoolFromNiveauEntree(entryClass.idNivEntree).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
                }
                else{
                  this.schoolService.getSchoolFromNiveauFrais(entryClass.idNivEntree, fee.borneInf, fee.borneSupp).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
                }
              } 
              else{
                if(fee == ''){
                  this.schoolService.getSchoolFromNiveauType(entryClass.idNivEntree, type.idTypeEntree).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
                }
                else{
                  this.schoolService.getSchoolFromNiveauTypeFrais(entryClass.idNivEntree, type.idTypeEntree, fee.borneInf, fee.borneSupp).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
                }
              }
            }
            else{
              if(type == ''){
                if(fee == ''){
                  this.schoolService.getSchoolFromNiveauDomaine(entryClass.idNivEntree, field.idDomaine).pipe(take(1)).subscribe(ecoles => this.ecoles = ecoles);
                }
                else{
                  
                }
              } 
              else{
                if(fee == ''){
        
                }
                else{
                  
                }
              }
            }
          }
        }
        else{
          if(entryClass == ''){
            if(field == ''){
              if(type == ''){
                if(fee == ''){
        
                }
                else{
                  
                }
              } 
              else{
                if(fee == ''){
        
                }
                else{
                  
                }
              }
            }
            else{
              if(type == ''){
                if(fee == ''){
        
                }
                else{
                  
                }
              } 
              else{
                if(fee == ''){
        
                }
                else{
                  
                }
              }
            }
          }
          else{
            if(field == ''){
              if(type == ''){
                if(fee == ''){
        
                }
                else{
                  
                }
              } 
              else{
                if(fee == ''){
        
                }
                else{
                  
                }
              }
            }
            else{
              if(type == ''){
                if(fee == ''){
        
                }
                else{
                  
                }
              } 
              else{
                if(fee == ''){
        
                }
                else{
                  
                }
              }
            }
          }
        } 
      }
      else{
        if(entryClass == ''){
          if(field == ''){
            if(type == ''){
              if(fee == ''){
      
              }
              else{
                
              }
            } 
            else{
              if(fee == ''){
      
              }
              else{
                
              }
            }
          }
          else{
            if(type == ''){
              if(fee == ''){
      
              }
              else{
                
              }
            } 
            else{
              if(fee == ''){
      
              }
              else{
                
              }
            }
          }
        }
        else{
          if(field == ''){
            if(type == ''){
              if(fee == ''){
      
              }
              else{
                
              }
            } 
            else{
              if(fee == ''){
      
              }
              else{
                
              }
            }
          }
          else{
            if(type == ''){
              if(fee == ''){
      
              }
              else{
                
              }
            } 
            else{
              if(fee == ''){
      
              }
              else{
                
              }
            }
          }
        }
      }
    }*/     
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
      this.searchForm.controls.department.reset();
    }
    else
    {
      this.schoolService.getDepartementFromRegion(region.idRegion).pipe(take(1)).subscribe(departements => this.departements = departements);
      this.searchForm.controls.department.reset();
    }    
  }

  //Button Events
  toggleAdvancedSearch()
  {
    if(!this.advancedSearch)
    {
      this.searchForm.controls.department.enable();
      this.searchForm.controls.type.enable();
      this.searchForm.controls.fee.enable();

      this.advancedSearch = !this.advancedSearch;
    }
    else
    {
      this.searchForm.controls.department.disable();
      this.searchForm.controls.type.disable();
      this.searchForm.controls.fee.disable();

      this.advancedSearch = !this.advancedSearch;
      
      this.searchForm.controls.department.reset();
      this.searchForm.controls.type.reset();
      this.searchForm.controls.fee.reset();
    }
  }
}
