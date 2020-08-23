
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donor } from './models/Donor-model';
import { Member } from './models/member-model';


@Injectable()
export class CallSessionService {
    constructor(private _http: HttpClient) { }
 
    getDonorsById(name:String): Observable<Donor[]> {
        return this._http.get<Donor[]>("api/CallSession/"+name);
    }
    deletePhoneNumber(donorToDeletePhone: string): Observable<Boolean> {
        debugger
        return this._http.put<Boolean>("api/CallSession/"+donorToDeletePhone,{});
    }
    deleteDonor(donorToDelete : string): Observable<Boolean> {
        return this._http.delete<Boolean>("api/CallSession/" + donorToDelete);
    }
    postDonor(donor:number,member:string) :Observable<Boolean>{
        debugger
        return this._http.put<Boolean>("api/CallSession/"+member+"/"+donor,{});
        debugger
    }
}