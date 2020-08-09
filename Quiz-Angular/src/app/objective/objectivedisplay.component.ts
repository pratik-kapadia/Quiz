import { Component, OnInit } from "@angular/core";
import { IObjective } from "src/models/objective";
import { ObjectiveService } from "src/objectiveService";

@Component({
  selector:'objective-display',
  templateUrl:'./objectivedisplay.component.html',
  styleUrls:['./objectivedisplay.component.css']
})
export class ObjectiveDisplay implements OnInit{

  objectives:IObjective[]
  constructor(private objectiveService: ObjectiveService) {


  }
  ngOnInit(){
    this.getAll();
  }

  getAll(){
    this.objectiveService.getObjectives().subscribe(
    (allObjectives)=>{ this.objectives = allObjectives },
    (err)=>console.log(err));
  }
}
