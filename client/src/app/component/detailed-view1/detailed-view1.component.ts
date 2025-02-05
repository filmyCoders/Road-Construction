import { Component } from '@angular/core';
import { Application, Datas, IPropertiesUpdate, Properties } from '../../model/Idata-params.interface';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-detailed-view1',
  templateUrl: './detailed-view1.component.html',
  styleUrls: ['./detailed-view1.component.css']
})
export class DetailedView1Component {
  data!: Application;
  selectedSampleTime: Datas = {} as Datas;  // Default empty object to avoid undefined
  selectedIndex: number | null = null;
  selectedData?: Datas ;  // Changed to null to handle initialization better
   selectedDate?:string
  constructor(private _dataService: DataService) { }
  properties:Properties[]=[]
  ngOnInit(): void {
    this._dataService.getData().subscribe((response) => {
      this.data = response; 
      
      let selecteddate=this.data.datas[0].samplingTime
          this.onSelectSamplingTime(selecteddate)
this.selectedDate=selecteddate
      console.log("Details View", this.data);
    });
  }

 
  
 // Handle updated data from the child component
  onDataUpdated(updatedData: IPropertiesUpdate): void {
    console.log('Updated Data in Parent Component:', updatedData);
    // Optionally, send the updated data to a service or API
  }
  saveData(): void {
    console.log('Saving data with the following values:', this.selectedSampleTime);  // Debug log
    if (this.selectedSampleTime && this.selectedSampleTime.samplingTime) {
      const index = this.data.datas.findIndex(d => d.samplingTime === this.selectedSampleTime.samplingTime);
      console.log('Index found:', index);  // Debug log
  
      if (index !== -1) {
        this.data.datas[index] = { ...this.selectedSampleTime };
        this._dataService.updateData(this.data).subscribe(
          () => {
            alert("Data updated successfully!");
          },
          (error) => {
            console.error('Error updating data:', error);
            alert("Error updating data.");
          }
        );
      } else {
        console.log('Index not found, cannot save data');
        alert("Selected data not found in the list.");
      }
    } else {
      console.log('Selected sample time is not defined');
      alert('Selected sample time is not defined');
    }
  }
  
  onSelectSamplingTime(samplingTime: string): void {
    let index = this.data.datas.findIndex((item) => item.samplingTime === samplingTime);
    if (index !== -1) {
      this.selectedIndex = index;
      this.selectedData = { ...this.data.datas[index] };
      this.selectedDate = new Date(samplingTime).toLocaleString();  // Converts to human-readable format
    }
  }
}
