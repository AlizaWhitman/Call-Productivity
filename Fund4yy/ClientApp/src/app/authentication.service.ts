import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Member } from './models/member-model';
import { environment } from '@env/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  httpOptions = null;
  rememberMe: boolean = false;

  private currentUserSubject: BehaviorSubject<Member>;
  public currentUser: Observable<Member>;

  constructor(
    public router: Router,
    private http: HttpClient
  ) //public ngZone: NgZone // NgZone service to remove outside scope warning
  {
    this.rememberMe = localStorage.getItem('rememberCurrentUser') == 'true' ? true : false;

    if ((this.rememberMe = true)) {
      this.currentUserSubject = new BehaviorSubject<Member>(
        JSON.parse(localStorage.getItem('currentUser'))
      );
    } else {
      this.currentUserSubject = new BehaviorSubject<Member>(
        JSON.parse(sessionStorage.getItem('currentUser'))
      );
    }

    this.currentUser = this.currentUserSubject.asObservable();

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  public get currentUserValue(): Member {
    return this.currentUserSubject.value;
  }

  SignIn(username: string, password: string, isRememberMe: boolean) {
    return this.http
      .post<any>(environment.environment.apiUrl + 'users/authenticate', { _id: username, password: password })
      .pipe(
        tap(user => {
          if (user && user.token) {
            if (isRememberMe) {
              this.resetcredentials();
              //your logged  out when you click logout
              localStorage.setItem('currentUser', JSON.stringify(user));
              localStorage.setItem('rememberCurrentUser', 'true');
            } else {
              //your logged  out when page/ browser is closed
              sessionStorage.setItem('currentUser', JSON.stringify(user));
            }
            // login successful if there's a jwt token in the response
            this.isLoggedIn = true;
            this.currentUserSubject.next(user);
            return true;
          } else {
            return false;
          }
        })
      );
  }
  resetcredentials() {
    //clear all localstorages
    localStorage.removeItem('rememberCurrentUser');
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  logout() {
    //clear all localstorages and redirect to main publib page
    this.resetcredentials();
    this.router.navigate(['/'], { replaceUrl: true });
  }
   }