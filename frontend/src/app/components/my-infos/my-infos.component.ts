import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-my-infos',
  templateUrl: './my-infos.component.html',
  styleUrls: ['./my-infos.component.scss']
})

export class MyInfosComponent implements OnInit, AfterViewInit 
{
  
  @ViewChild('paginator', {static: true}) paginator!: MatPaginator;
  ELEMENT_DATA = 
  [
    {Evento: 'RED HOT CHILI PEPPERS - CURITIBA', Data: '01/07/2023', Quantidade: 2, Valor: 'R$ 120,00'},
    {Evento: 'red hot chili peppers – curitiba', Data: '01/07/2023', Quantidade: 2, Valor: 'R$ 120,00'},
    {Evento: 'nxzero', Data: '01/07/2023', Quantidade: 2, Valor: 'R$ 120,00'},
    {Evento: 'the weeknd', Data: '01/07/2023', Quantidade: 2, Valor: 'R$ 120,00'},
    {Evento: 'cold play', Data: '01/07/2023', Quantidade: 2, Valor: 'R$ 120,00'},
    {Evento: 'zé ramalho no qualistage', Data: '01/07/2023', Quantidade: 2, Valor: 'R$ 120,00'},
    {Evento: 'Henrique & Juliano - Show de sertanejo', Data: '01/07/2023', Quantidade: 2, Valor: 'R$ 120,00'},
    {Evento: 'Henrique & Juliano - Show de sertanejo', Data: '01/07/2023', Quantidade: 2, Valor: 'R$ 120,00'},
    {Evento: 'Henrique & Juliano - Show de sertanejo', Data: '01/07/2023', Quantidade: 2, Valor: 'R$ 120,00'},
    {Evento: 'Henrique & Juliano - Show de sertanejo', Data: '01/07/2023', Quantidade: 2, Valor: 'R$ 120,00'},
  ];

  displayedColumns: string[] = [];
  dataSource: any;

  constructor()
  {

  }

  ngOnInit(): void 
  {
    this.displayedColumns = ['Evento', 'Data', 'Quantidade', 'Valor'];
    //this.dataSource = this.ELEMENT_DATA;
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface PeriodicElement 
{
  Evento: string;
  Data: string;
  Quantidade: number;
  Valor: string
}
