import { Component, OnInit, Input, OnDestroy, ElementRef, DoCheck, Output, EventEmitter } from "@angular/core";
import { ObjectiveService } from "src/objectiveService";
import { IObjective } from "src/models/objective";
import { Router } from "@angular/router";

@Component({
  selector: 'side-nav',
  styleUrls: ['./sidenav.component.css'],
  templateUrl: './sidenav.component.html'
})

export class SideNavComponent implements OnInit, OnDestroy {

  @Input() objectives: IObjective[];
  @Output() questionChange = new EventEmitter();

  constructor(private elementRef: ElementRef, private objectiveService: ObjectiveService, private router: Router) {

  }

  ngOnInit() {
    this.questionChange.emit(this.objectives[0].id);
  }
  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
  }

  showOptions(id) {
    this.questionChange.emit(id);
  }

  // ngOnInit(){
  //   this.getObjectives();
  // }

  // getObjectives() {
  //   this.objectiveService.getObjectives().subscribe(
  //     (result: IObjective[]) => {
  //       this.objectives = result;
  //       console.log(this.objectives);
  //     },
  //     (err: any) => console.error(err))
  // }
}
