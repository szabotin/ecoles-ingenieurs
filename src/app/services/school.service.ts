import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
// import { School } from '../models/school-model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Region } from '../interfaces/region.interface';
import { environment } from '../../environments/environment';
import { Domaine } from '../interfaces/domain.interface';
import { Niveau } from '../interfaces/niveau.interface';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {


  //schools!: School[];
  schoolsSubject = new Subject<any[]>();

  private schools = [ 
    {
      name: "Institut Supérieur d'Informatique, de Modélisation et de leurs Applications",
      acronym: "ISIMA",
      field: "IMA", // Informatique et Mathématiques Appliquées
      entryLevel: ["Lycée", "DUT", "CPGE"],
      address: "1 rue de la Chebarde",
      city: "Aubière",
      zipCode: 63170,
      region: "ARA",
      registrationFees: 601
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
      registrationFees: 601
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
      registrationFees: 601
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
  ];
  constructor(private http: HttpClient) { }

  emitSchoolsSubject() {
    this.schoolsSubject.next(this.schools.slice());
  }

  displaySchools() {
  }

  getSchools() { 
    // récupérer les données à partir de la base de données
  }

  getSingleSchool() {

  }

  getSchoolFromRegion(region: string) {
    for (var i = 0 ; i < this.schools.length ; i++) {
      if (this.schools[i].region == region) {
        console.log(this.schools[i].region)
      }
    }
  }

  searchSchool(entryClass: string, field: string, region: string) {
    for (var i = 0 ; i < this.schools.length ; i++) {
      console.log(this.schools[i]['name'])
    } 
  }


  getRegionForSelector(): Observable<Region[]> {
    return this.http.get<Region[]>(environment.backendUrl + '/region');
  }

  getDomaineForSelector(): Observable<Domaine[]> {
    return this.http.get<Domaine[]>(environment.backendUrl + '/domaine');
  }

  getNiveauForSelector(): Observable<Niveau[]> {
    return this.http.get<Niveau[]>(environment.backendUrl + '/niveau');
  }
}
