import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { School } from '../models/school-model';

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
      city: "Aubière",
      zipCode: 63170,
      region: "ARA",
      registrationFees: 601
    },
    {
      name: "Polytech Clermont",
      acronym: "PC",
      field: "G",
      entryLevel: ["Lycée", "DUT", "CPGE"],
      city: "Aubière",
      zipCode: 63170,
      region: "ARA",
      registrationFees: 601
    },
    {
      name: "SIGMA Clermont",
      acronym: "SIGMA",
      field: "MP",
      entryLevel: ["Lycée", "DUT", "CPGE"],
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
      city: "Brest",
      zipCode: 29000,
      region: "BRE",
      registrationFees: 4600
    }
  ];
  constructor() { }

  emitSchoolsSubject() {
    this.schoolsSubject.next(this.schools.slice());
  }

  getSchools() { 
    // récupérer les données à partir de la base de données
  }

  displaySchools() {

  }

  // getSchoolFromRegion(region: string) {
  //   for (var i = 0 ; i < this.schools.length ; i++) {
  //     if (this.schools[i].region == region) {
  //       console.log(this.schools[i].region)
  //     }
  //   }
  // }

  searchSchool(entryClass: string, field: string, region: string) {
    for (var i = 0 ; i < this.schools.length ; i++) {
      console.log(this.schools[i]['name'])
    } 
  }
}
