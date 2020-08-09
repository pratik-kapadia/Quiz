import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersViewComponent } from './users-view/users-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserFilterPipe } from './users-view/user-filter.pipe';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { ListEmployeeComponent } from './employee/list-employee.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EmployeeService } from './employee/employee.service';
import { EmployeePipe } from './employee/employee.pipe';
import { PanelComponent } from './objective/panel.component';
import { CommonModule } from '@angular/common';
import { CreateObjectiveComponent } from './objective/createobjective.component';
import { ObjectiveDisplay } from './objective/objectivedisplay.component';
import { DashboardComponent } from './objective/dashboard.component';
import { SideNavComponent } from './objective/sidenav.component';
import { AppHeaderComponent } from './header/app.header.component';
import { QuestionOptionsComponent } from './question-options/question-options.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersViewComponent,
    PanelComponent,
    PageNotFoundComponent,
    UserFilterPipe,
    CreateEmployeeComponent,
    ListEmployeeComponent,
    EmployeePipe,
    CreateObjectiveComponent,
    ObjectiveDisplay,
    DashboardComponent,
    SideNavComponent,
    AppHeaderComponent,
    QuestionOptionsComponent,
    QuizResultComponent,
    CreateQuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [EmployeeService,EmployeePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
