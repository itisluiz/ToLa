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
    const createAccount = document.getElementById("create-account-btn");
    const closePopUpBtn = document.getElementById("close-popup-btn");
    const popUp = document.getElementsByClassName("popup")[0];
    const closePopup = document.getElementById("closePopup");

    /* Inputs do form */
    const Nome = <HTMLInputElement>document.getElementById("Nome");
    const Email = <HTMLInputElement>document.getElementById("Email");
    const Senha = <HTMLInputElement>document.getElementById("Senha");
    const ConfirmSenha = <HTMLInputElement>document.getElementById("ConfirmSenha");

    createAccount?.addEventListener("click", function()
    {
      if(Nome?.value !== "" && Email?.value !== "" && Senha?.value !== "" && ConfirmSenha?.value !== "")
      {
        popUp.classList.toggle("active");
      }
    });

    closePopup?.addEventListener("click", function()
    {
      popUp.classList.remove("active");
    });

  }

}
