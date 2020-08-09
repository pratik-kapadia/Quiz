import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersViewComponent } from './users-view/users-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListEmployeeComponent } from './employee/list-employee.component';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { PanelComponent } from './objective/panel.component';
import { CreateObjectiveComponent } from './objective/createobjective.component';
import { ObjectiveDisplay } from './objective/objectivedisplay.component';
import { DashboardComponent } from './objective/dashboard.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';

const routes: Routes = [
  { path: 'list', component: ListEmployeeComponent },
  { path: 'panel', component: PanelComponent },
  { path: 'create', component: CreateEmployeeComponent },
  { path: 'createquiz', component: CreateQuizComponent},
  { path: 'edit/:id', component: CreateEmployeeComponent },
  { path: 'objective/:testid', component: PanelComponent },
  { path: 'createobjective', component: CreateObjectiveComponent },
  { path: 'editobjective/:id', component: CreateObjectiveComponent },
  { path: 'allobjectives', component: ObjectiveDisplay },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users-view', component: UsersViewComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
