import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { login, signUp } from '../../data-type';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 isUserloggedIn = new BehaviorSubject<boolean>(false);
  invalidUserAuth = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

userSignup(user: signUp) {
  this.http
    .post('http://localhost:3000/user', user, { observe: 'response' })
    .subscribe((result: any) => {
      if (result) {
        console.log("User registered:", result);
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['/']);
      }
    });
}


  userLogin(data: login) {
    this.http
      .get(
        `http://localhost:3000/user?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        if (result && result.body?.length) {
          console.log("User logged in", result);
          this.invalidUserAuth.emit(false);
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
        } else {
          console.log("Invalid credentials");
          this.invalidUserAuth.emit(true);
        }
      });
  }
  
  getUsers(): Observable<signUp[]> {
    return this.http.get<signUp[]>('http://localhost:3000/user');
  }

  getUserById(id: string): Observable<signUp> {
    return this.http.get<signUp>(`http://localhost:3000/user/${id}`);
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${'http://localhost:3000/user'}/${userId}`);
  }

  updateUser(userId: string, user: signUp): Observable<signUp> {
    return this.http.put<signUp>(`${'http://localhost:3000/user'}/${userId}`, user);
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }

    saveDraggedElements(elements: { elements: string[] }): Observable<any> {
      return this.http.post('http://localhost:3000/elements', elements);
    }

getSavedElements() {
  return this.http.get<{ elements: any[] }>('http://localhost:3000/elements');
}

    saveDoneElements(elements: { elements: { label: string, x: number, y: number, zIndex: number }[] }) {
      return this.http.post('http://localhost:3000/elements', elements);
  }
  
  
}
