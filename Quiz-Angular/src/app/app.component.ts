import { Component, ViewChild, AfterViewInit, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { ListEmployeeComponent } from './employee/list-employee.component';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { EmployeePipe } from './employee/employee.pipe';
import { ObjectiveService } from 'src/objectiveService';
import { IObjective, SelectObjective } from 'src/models/objective';
import { DashboardComponent } from './objective/dashboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit, OnDestroy, DoCheck {
  title = 'ExampleApp';
  currentRouter: string;
  objectives = [];
  showNavigationHeader:boolean;

  constructor(private employeePipe: EmployeePipe, private objectiveService: ObjectiveService, public router: Router) {
   this.currentRouter = this.router.url;
  }

  ngOnInit() {
    this.showNavigationHeader = true;
  }

  ngDoCheck(){
    if(this.routerOutlet.isActivated && this.routerOutlet.component as DashboardComponent){
      this.showNavigationHeader = (this.routerOutlet.component as DashboardComponent).showTestLayout;
    }
    //this.showNavigationHeader
    //console.log(console.log((this.routerOutlet.component as DashboardComponent).showTestLayout));
  }

  ngOnDestroy(){
    this.objectives = [];
  }

  // @ViewChild(RouterOutlet)
  // routerOutlet: RouterOutlet;

  @ViewChild(RouterOutlet)
  routerOutlet: RouterOutlet;

  searchEmployee(term: string) {
    console.log(term);
    const listEmployeeComponent = this.routerOutlet.component as ListEmployeeComponent
    listEmployeeComponent.checkMethod(term);
    //this.employeePipe.transform(listEmployeeComponent.employees, term);
  }

  getObjectives() {
    this.objectiveService.getObjectives().subscribe(
      (result: IObjective[]) => {
        this.objectives = result;
        console.log(this.objectives);
        this.router.navigate(['/objective', this.objectives[0].id, 1]);

      },
      (err: any) => console.error(err))
  }

  getObjectivesByTestId(testid) {
    this.objectiveService.getObjectivesByTestId(testid).subscribe(
      (result: IObjective[]) => {
        this.objectives = result;
        console.log(this.objectives);
        this.router.navigate(['/objective', this.objectives[0].id, 1]);

      },
      (err: any) => console.error(err))
  }

  // startQuiz(testid) {
  //   this.getObjectives ();
  //   if (this.objectives && this.objectives.length) {
  //     //this.router.navigate(['/objective', this.objectives[0].id, 1]);
  //     console.log((this.routerOutlet.component as DashboardComponent).showTestLayout)
  //   }
  // }
}
