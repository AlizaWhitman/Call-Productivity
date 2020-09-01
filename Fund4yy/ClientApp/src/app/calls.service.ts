
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CallsSummary } from './models/call-summary-model';
import { DonorsList } from './models/donors-list-model';

@Injectable()
export class CallsService {
    constructor(private _http: HttpClient) { }

    saveCall(callSummary: CallsSummary): Observable<void> {
        return this._http.post<void>("api/CallsSummary", callSummary);
    }

    getDonors(): Observable<DonorsList[]> {
        return this._http.get<DonorsList[]>("api/Donors");
    }

}
