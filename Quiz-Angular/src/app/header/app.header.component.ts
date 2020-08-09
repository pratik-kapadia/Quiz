import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { DashboardComponent } from "../objective/dashboard.component";
import { DataService } from "src/dataservice";
import { TestResultService } from "src/testResultService";

@Component({
  selector:'app-header',
  templateUrl:'./app.header.component.html',
  styleUrls:['./app.header.component.css']
})

export class AppHeaderComponent implements OnInit {
  @Input() showNavigationHeader:boolean;

  constructor(private router: Router,private dataservice: DataService,private testResultService:TestResultService) {

  }

  ngOnInit(){
    this.showNavigationHeader = true;
    console.log('called after');
  }

  onSubmit(){
    let examResult = this.dataservice.getExamResult();
    this.testResultService.upsertResult(examResult)
    this.showNavigationHeader = false;
    console.log(examResult);
  }
}
