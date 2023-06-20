import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-tabs',
  templateUrl: './payment-tabs.component.html',
  styleUrls: ['./payment-tabs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentTabsComponent {
  num: any;

  ngOnInit() {
    let i: number = 1;
  
    const plus = document.getElementById(".plus");
    const minus = document.querySelector(".minus");
    const num = document.getElementById("num");

    plus?.addEventListener("click", () => {
      i++;
      this.num.textContent = "teste";
      console.log('a')
    });
  }


}
