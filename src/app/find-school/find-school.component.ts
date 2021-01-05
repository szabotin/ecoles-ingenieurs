import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-school',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class FindSchoolComponent implements OnInit {

  formulaireDeRecherche: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formulaireDeRecherche = this.formBuilder.group( {
      classe: [''],
      domaine: [''],
      region: ['']
    })
  }
  
  onRecherche() {
    
    this.router.navigate(['/ecoles', 'liste-ecoles']);
  }
}
