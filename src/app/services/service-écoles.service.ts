import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { School } from '../models/school-model';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  
  schools!: School[];
  schoolsSubject = new Subject<School[]>();

  constructor() { }

  emitSchoolsSubject() {
    this.schoolsSubject.next(this.schools.slice());
  }

  getSchools() {
    
  }
}
