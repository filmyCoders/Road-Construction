import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Application, Datas } from '../../model/Idata-params.interface';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-summary-view',
  templateUrl: './summary-view.component.html',
  styleUrl: './summary-view.component.css',
  animations: [
    trigger('pageAnimation', [
      transition('* => *', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
    ]),
  ],
})
export class SummaryViewComponent implements OnInit {


  constructor(private _dataService: DataService) { }
  data!: Application;
  selectedSampleTime!: Datas;


  ngOnInit(): void {
    this._dataService.getData().subscribe((response) => {
      this.data = response;
      console.log(this.data)
    });
  }



  getProperty(item: Datas, label: string): string | number | boolean | undefined {
    return item.properties.find(prop => prop.label === label)?.value;
  }


}
