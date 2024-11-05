import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  userName: string | null = '';

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // Load user details on initialization
    this.loadUserName();
  }
  
  isLoggedIn(): boolean {
    // Check if the code is running in the browser
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('user');
    }
    return false;
  }

  userLogout(){
    localStorage.removeItem('user');
    this.router.navigate(['/register-login']);
  }

  loadUserName(): void {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        this.userName = userData?.name || 'User';  // Assuming the user's name is stored as 'name'
        console.log(this.userName);
      }
    }
  }

}
