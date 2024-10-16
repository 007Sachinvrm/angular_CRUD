import { Component, OnInit, ViewChild } from '@angular/core';
import { signUp } from '../../data-type';  // Ensure this import is correct
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone','address', 'actions'];
  dataSource = new MatTableDataSource<signUp>([]);
  totalUser = 0;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort; 

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe((data: signUp[]) => {
      this.dataSource.data = data;
      this.totalUser = data.length;
      this.dataSource.paginator = this.paginator; 
      this.dataSource.sort = this.sort;
      console.log(this.sort)
    });
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.fetchUsers(); 
      });
    }
  }

  editUser(user: signUp): void {
    this.router.navigate(['edit', user.id]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
