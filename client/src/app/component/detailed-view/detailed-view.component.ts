import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Application, Datas } from '../../model/Idata-params.interface';
import { DataService } from '../../services/data.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css'],
  animations: [
    trigger('pageAnimation', [
      transition('* => *', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
    ]),
  ],
})
export class DetailedViewComponent implements OnInit, OnDestroy {
  data!: Application;
  selectedIndex: number | null = null;
  selectedData: Datas | null = null;
  selectedDate?: string;
  sampleForm!: FormGroup;
  private subscription = new Subscription();

  constructor(private dataService: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();

    this.subscription.add(
      this.dataService.getData().subscribe({
        next: (response) => {
          this.data = response;
          console.log("Load Data:", this.data);

          if (this.data?.datas?.length > 0) {
            this.selectedDate = this.data.datas[0].samplingTime;
            this.onSelectSamplingTime(this.selectedDate, 0);
          }
        },
        error: (err) => console.error("Error loading data:", err)
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
//#region Initilize Data 
  private initializeForm(): void {
    this.sampleForm = this.fb.group({
      projectName: ['', Validators.required],
      lengthOfRoad: [
        0,
        [
          Validators.min(0), // Ensures it's a positive number
          Validators.pattern(/^(\d+(\.\d{1,2})?)$/) // Allows up to 2 decimal places
        ]
      ],
      constructionCount: [
        0,
        [
          Validators.min(0), // Ensures it's a positive number
          Validators.pattern(/^(\d+(\.\d{1,2})?)$/) // Allows up to 2 decimal places
        ]
      ],
      isConstructionCompleted: [false]
    });
  }

  onSelectSamplingTime(samplingTime: string, index: number): void {
    this.selectedIndex = index;
    this.selectedData = { ...this.data.datas[index] };

    if (this.selectedData?.properties?.length) {
      const propertiesMap = new Map(
        this.selectedData.properties.map((prop: any) => [prop.label, prop.value])
      );

      this.sampleForm.patchValue({
        projectName: propertiesMap.get("Project Name") || '',
        constructionCount: propertiesMap.get("Construction Count") || '',
        isConstructionCompleted: propertiesMap.get("Is Construction Completed") ?? false,
        lengthOfRoad: propertiesMap.get("Length of the road") || ''
      });
    } else {
      console.warn('No valid data found for this sampling time.');
      this.sampleForm.reset();
    }
  }
//#endregion


//#region Update Data
  saveData(): void {
    if (this.sampleForm.invalid) {
      console.warn('Form is invalid!');
      return;
    }

    if (this.selectedData) {
      const updatedValues = this.sampleForm.value;
      console.log("Updated Values:", updatedValues);

      const hasChanges = this.selectedData.properties.some(prop => updatedValues[prop.label] !== prop.value);
      if (!hasChanges) {
        console.log('No changes detected.');
        return;
      }

      let constructionCountAdded = false;

      if (this.selectedData?.properties?.length) {
        const propertiesMap = new Map(
          this.selectedData.properties.map((prop: any) => [prop.label, prop.value])
        );
        this.sampleForm.patchValue({
          projectName: propertiesMap.get("Project Name") || '',
          constructionCount: propertiesMap.get("Construction Count") || '',
          isConstructionCompleted: propertiesMap.get("Is Construction Completed") ?? false,
          lengthOfRoad: propertiesMap.get("Length of the road") || ''
        });
      } else {
        console.warn('No valid data found for this sampling time.');
        this.sampleForm.reset();
      }

      if (!constructionCountAdded) {
        this.selectedData.properties.splice(1, 0, { label: 'Construction Count', value: updatedValues['constructionCount'] });
      }

      const index = this.data.datas.findIndex(d => d.samplingTime === this.selectedData?.samplingTime);

      if (index !== -1) {
        this.data.datas[index] = { ...this.selectedData };
        console.log("Save Data:", this.data);

        this.dataService.updateData(this.data).subscribe(
          () => {
            this.selectedData = null;
            alert('Data updated successfully!');
          },
          (error) => {
            console.error('Error updating data:', error);
            alert('Error updating data.');
          }
        );
      } else {
        console.warn('Index not found, cannot save data');
      }
    }
  }
//#endregion

}
