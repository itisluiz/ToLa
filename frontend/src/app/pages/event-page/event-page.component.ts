import { Component } from '@angular/core';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent {

  artist: any[] = [
    {
      'name' : 'Matue',
      'photo' : '../../../assets/matue-mock.svg'
    },
    {
      'name' : 'WC no Beat',
      'photo' : '../../../assets/wcnobeat.svg'
    },
    {
      'name' : 'l7nnon',
      'photo' : '../../../assets/l7.svg'
    },
    {
      'name' : 'Hyperanhas',
      'photo' : '../../../assets/hyperanhas.svg'
    },
    {
      'name' : 'Filipe Ret',
      'photo' : '../../../assets/ret.svg'
    },
    {
      'name' : 'Cabelinho',
      'photo' : '../../../assets/cabelinho.svg'
    },
    {
      'name' : 'Sidoka',
      'photo' : '../../../assets/sidoka.svg'
    },
    {
      'name' : 'Orochi',
      'photo' : '../../../assets/orochi.svg'
    },
    {
      'name' : 'Teto',
      'photo' : '../../../assets/teto.svg'
    },
    {
      'name' : 'Chefin',
      'photo' : '../../../assets/chefin.svg'
    }
  ]
}
