import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { signUp } from '../../data-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) { }

  userSignup(user: signUp){
    this.http
      .post('http://localhost:3000/user', user, { observe: 'response' })
      .subscribe((result) => {
        // console.log(result);
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
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
  
}
