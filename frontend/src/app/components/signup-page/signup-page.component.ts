import { Component } from '@angular/core';

declare function CreateAccountPopUp(): any;

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent 
{

  ngOnInit()
  {
    CreateAccountPopUp();
  }

}
