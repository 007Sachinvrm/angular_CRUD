import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { EditComponent } from './edit/edit.component';
import { AuthGuard } from './auth.guard';
import { DragDropComponent } from './drag-drop/drag-drop.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register-login',
    component: UserRegisterComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'drag-drop',
    component: DragDropComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
