import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Region } from '../interfaces/region.interface';
import { environment } from '../../environments/environment';
import { Domaine } from '../interfaces/domaine.interface';
import { NiveauEntree } from '../interfaces/niveauEntree.interface';
import { Ecole } from '../interfaces/ecole.interface';
import { Departement } from '../interfaces/departement.interface';
import { TypeEntree } from '../interfaces/typeEntree.interface';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  schoolsSubject = new Subject<any[]>();

  /*private schools = [ 
    {
      name: "Institut Supérieur d'Informatique, de Modélisation et de leurs Applications",
      acronym: "ISIMA",
      field: "IMA", // Informatique et Mathématiques Appliquées
      entryLevel: ["Lycée", "DUT", "CPGE"],
      address: "1 rue de la Chebarde",
      city: "Aubière",
      zipCode: 63170,
      region: "ARA",
      registrationFees: 601,
      latitude: 44.0000,
      longitude: 1.0000,
    },
    {
      name: "Polytech Clermont",
      acronym: "PC",
      field: "GEN",
      entryLevel: ["Lycée", "DUT", "CPGE"],
      address: "1 rue de la Chebarde",
      city: "Aubière",
      zipCode: 63170,
      region: "ARA",
      registrationFees: 601,
      latitude: 46.0000,
      longitude: 1.5000,
    },
    {
      name: "SIGMA Clermont",
      acronym: "SIGMA",
      field: "GEN",
      entryLevel: ["Lycée", "DUT", "CPGE"],
      address: "1 rue de la Chebarde",
      city: "Aubière",
      zipCode: 63170,
      region: "ARA",
      registrationFees: 601,
      latitude: 45.800000,
      longitude: 3.043000
    },
    {
      name: "VetAgro Sup",
      acronym: "VAS",
      field: "AAA", 
      entryLevel: ["DUT", "CPGE"],
      address: "1 rue de la Chebarde",
      city: "Lempdes",
      zipCode: 63760,
      region: "ARA",
      registrationFees: 1600
    },
    {
      name: "Ecole Nationale Supérieure d'informatique, de mathématiques générales",
      acronym: "ENSIMAG",
      field: "CAM", 
      entryLevel: ["CPGE"],
      address: "1 rue de la Chebarde",
      city: "Paris",
      zipCode: 75000,
      region: "IDF",
      registrationFees: 2600
    },
    {
      name: "Centrale Supélec",
      acronym: "CS",
      field: "GEN",
      entryLevel: ["CPGE"],
      address: "1 rue de la Chebarde",
      city: "Bourges",
      zipCode: 87800,
      region: "CEN",
      registrationFees: 2600
    },
    {
      name: "Les mines ParisTech",
      acronym: "Mines",
      field: "GEN", 
      entryLevel: ["CPGE"],
      address: "1 rue de la Chebarde",
      city: "Paris",
      zipCode: 75002,
      region: "IDF",
      registrationFees: 1600
    },
    {
      name: "INSA Rouen",
      acronym: "INSA",
      field: "GC",
      entryLevel: ["DUT", "CPGE"],
      address: "1 rue de la Chebarde",
      city: "Rouen",
      zipCode: 76000,
      region: "NOR",
      registrationFees: 601
    },
    {
      name: "INSA Toulouse",
      acronym: "INSA",
      field: "EEA",
      entryLevel: ["Lycée", "DUT", "CPGE"],
      address: "1 rue de la Chebarde",
      city: "Toulouse",
      zipCode: 33000,
      region: "MID",
      registrationFees: 601
    },
    {
      name: "Ecole Pluri Interdisciplinaire de Travaux Appliqués",
      acronym: "EPITA",
      field: "IMA", 
      entryLevel: ["CPGE"],
      address: "1 rue de la Chebarde",
      city: "Les lilas",
      zipCode: 93003,
      region: "IDF",
      registrationFees: 601
    },
    {
      name: "Ecole Pluri Interdisciplinaire TECHnique",
      acronym: "EPITECH",
      field: "IMA",
      entryLevel: ["Lycée", "DUT", "CPGE"],
      address: "1 rue de la Chebarde",
      city: "Brest",
      zipCode: 29000,
      region: "BRE",
      registrationFees: 4600
    }
  ];*/
  
  constructor(private http: HttpClient) { }

 /* emitSchoolsSubject() {
    this.schoolsSubject.next(this.schools.slice());
  }


  searchSchool(entryClass: string, field: string, region: string) {
    for (var i = 0 ; i < this.schools.length ; i++) {
      console.log(this.schools[i]['name'])
    } 
  }*/
  



  //---------------------------------------------BackEnd Queries-------------------------------------------------------
  //------------------------------------------Queries for Selector-----------------------------------------------------

  getRegionForSelector(): Observable<Region[]> {
    return this.http.get<Region[]>(environment.researchBackendUrl + '/region');
  }

  getDomaineForSelector(): Observable<Domaine[]> {
    return this.http.get<Domaine[]>(environment.researchBackendUrl + '/domaine');
  }

  getNiveauForSelector(): Observable<NiveauEntree[]> {
    return this.http.get<NiveauEntree[]>(environment.researchBackendUrl + '/niveau');
  }

  getDepartementForSelector(): Observable<Departement[]> {
    return this.http.get<Departement[]>(environment.researchBackendUrl + '/departement');
  }

  getTypeForSelector(): Observable<TypeEntree[]> {
    return this.http.get<TypeEntree[]>(environment.researchBackendUrl + '/type');
  }



  getSchoolFromSimpleResearch(niveau: any, domaine: any, region: any): Observable<Ecole[]>{
    return this.http.get<Ecole[]>(environment.researchBackendUrl + '/simpleSearch/' + niveau + '/' + domaine + '/' + region);
  }

  getSchoolFromAdvancedResearchV1(niveau: any, domaine: any, region: any, type: any, borneInf: any, borneSup: any): Observable<Ecole[]>{
    return this.http.get<Ecole[]>(environment.researchBackendUrl + '/advancedSearchV1/' + niveau + '/' + domaine +'/' + region +'/' + type + '/' + borneInf + '/' + borneSup);
  }

  getSchoolFromAdvancedResearchV2(niveau: any, domaine: any, departement: any, type: any, borneInf: any, borneSup: any): Observable<Ecole[]>{
    return this.http.get<Ecole[]>(environment.researchBackendUrl + '/advancedSearchV2/' + niveau + '/' + domaine +'/' + departement +'/' + type + '/' + borneInf + '/' + borneSup);
  }

  //----------------Queries to get department from region---------------------------------------------

  getDepartementFromRegion(idRegion: string): Observable<Departement[]> {
    return this.http.get<Departement[]>(environment.researchBackendUrl + '/departementRegion/' + idRegion);
  }


  //----------------------Queries to get school from 1 arg------------------------------------

  getSchoolFromRegion(idRegion: string): Observable<Ecole[]>{
    return this.http.get<Ecole[]>(environment.researchBackendUrl + '/rechercheRegion/' + idRegion);
  }

  getSchoolFromDepartement(idDepartement: string): Observable<Ecole[]>{
    return this.http.get<Ecole[]>(environment.researchBackendUrl + '/rechercheDepartement/' + idDepartement);
  }

  getSchoolFromNiveauEntree(idNiveau: number): Observable<Ecole[]>{
    return this.http.get<Ecole[]>(environment.researchBackendUrl + '/rechercheNiveau/' + idNiveau);
  }

  getSchoolFromTypeEntree(idType: number): Observable<Ecole[]>{
    return this.http.get<Ecole[]>(environment.researchBackendUrl + '/rechercheType/' + idType);
  }

  getSchoolFromDomaine(idDomaine: number): Observable<Ecole[]>{
    return this.http.get<Ecole[]>(environment.researchBackendUrl + '/rechercheDomaine/' + idDomaine);
  }

  getSchoolFromFrais(borneInf: number, borneSup: number): Observable<Ecole[]>{
    return this.http.get<Ecole[]>(environment.researchBackendUrl + '/rechercheFrais/' + borneInf + '/' + borneSup);
  }


  //---------------------Queries to get school from 2 args----------------------------------------------

  getSchoolFromNiveauRegion(idNiveau: number, idRegion: string): Observable<Ecole[]>{
    return this.http.get<Ecole[]>(environment.researchBackendUrl + '/rechercheNiveauRegion/' + idNiveau + '/' + idRegion);
  }

  getSchoolFromNiveauDomaine(idNiveau: number, idDomaine: number): Observable<Ecole[]>{
    return this.http.get<Ecole[]>(environment.researchBackendUrl + '/rechercheNiveauDomaine/' + idNiveau + '/' + idDomaine);
  }

  getSchoolFromRegionDomaine(idRegion: string, idDomaine: number): Observable<Ecole[]>{
    return this.http.get<Ecole[]>(environment.researchBackendUrl + '/rechercheRegionDomaine/' + idRegion + '/' + idDomaine);
  }

  getSchoolFromNiveauFrais(idNiveau: number, borneInf: number, borneSup: number): Observable<Ecole[]>{
    return this.http.get<Ecole[]>(environment.researchBackendUrl + '/rechercheNiveauFrais/' + idNiveau + '/' + borneInf + '/' + borneSup);
  }

  getSchoolFromDomaineFrais(idDomaine: number, borneInf: number, borneSup: number): Observable<Ecole[]>{
    return this.http.get<Ecole[]>(environment.researchBackendUrl + '/rechercheDomaineFrais/' + idDomaine + '/' + borneInf + '/' + borneSup);
  }

  getSchoolFromTypeFrais(idType: number, borneInf: number, borneSup: number): Observable<Ecole[]>{
    return this.http.get<Ecole[]>(environment.researchBackendUrl + '/rechercheTypeFrais/' + idType + '/' + borneInf + '/' + borneSup);
  }

  getSchoolFromTypeDomaine(idType: number, idDomaine: number): Observable<Ecole[]>{
    return this.http.get<Ecole[]>(environment.researchBackendUrl + '/rechercheTypeDomaine/' + idType + '/' + idDomaine);
  }

  getSchoolFromNiveauType(idNiveau: number, idType: number): Observable<Ecole[]>{
    return this.http.get<Ecole[]>(environment.researchBackendUrl + '/rechercheNiveauType/' + idNiveau + '/' + idType);
  }

  //-----------------------Queries to get school from 3 args-----------------------------------------

  getSchoolFromDomaineRegionNiveau(idDomaine: number, idRegion: string, idNiveau: number): Observable<Ecole[]>{
    return this.http.get<Ecole[]>(environment.researchBackendUrl + '/rechercheDomaineRegionNiveau/' + idDomaine + '/' + idRegion + '/' + idNiveau);
  }

  getSchoolFromDomaineTypeFrais(idDomaine: number, idType: number, borneInf: number, borneSup: number): Observable<Ecole[]>{
    return this.http.get<Ecole[]>(environment.researchBackendUrl + '/rechercheDomaineTypeFrais/' + idDomaine + '/' + idType + '/' + borneInf + '/' + borneSup);
  }

  getSchoolFromNiveauTypeFrais(idNiveau: number, idType: number, borneInf: number, borneSup: number): Observable<Ecole[]>{
    return this.http.get<Ecole[]>(environment.researchBackendUrl + '/rechercheNiveauTypeFrais/' + idNiveau + '/' + idType + '/' + borneInf + '/' + borneSup);
  }


  //------------------------Queries to get school from 4 args---------------------------------------




  //-------------------------Queries to get school from all args------------------------------------
}
