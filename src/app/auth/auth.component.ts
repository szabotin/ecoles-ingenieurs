import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  searchForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }


  onSubmitForm()
  {

  }
}
