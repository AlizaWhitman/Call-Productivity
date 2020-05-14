
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donor } from './models/Donor-model';


@Injectable()
export class CallSessionService {
    constructor(private _http: HttpClient) { }
 
    getDonors(): Observable<Donor[]> {
        return this._http.get<Donor[]>("api/CallSession");
    }
}