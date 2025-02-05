import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { GET_RECORDS, UPDATE_RECORDS } from '../constant/api-end-points';
import { Application } from '../model/Idata-params.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }

  getData(): Observable<any> {
    return this._http.get<any>(GET_RECORDS);
  }

  updateData(data: Application,): Observable<Application> {
    console.log("Services Data:", data); 
    return this._http.put<Application>(UPDATE_RECORDS, data); // 
  }
  

 
  
}
