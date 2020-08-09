import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { TestService } from "src/testService";
import { ITest } from "src/models/test";
import { ObjectiveService } from "src/objectiveService";
import { IObjective, SelectObjective } from "src/models/objective";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ObjectiveSelectOption } from "src/models/objectiveSelectOption";
import { map, catchError } from "rxjs/operators";
import { ExamData } from "src/models/examdata";
import { saveAs } from 'file-saver';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = "Practice Challenges";
  testlist: ITest[];
  objectives: SelectObjective[];

  objectiveSelectOption: ObjectiveSelectOption;
  showTestLayout: boolean;
  objective: SelectObjective;
  objectiveForm: FormGroup;
  examdata: ExamData[];
  isSubmitted: boolean;
  testId:number;
  testResultId:string;

  @Output() hideNavigationHeaders = new EventEmitter();

  constructor(private fb: FormBuilder, private testService: TestService, private objectiveService: ObjectiveService, private router: Router) {

  }

  ngOnInit() {
    this.examdata = [];

    this.objectiveForm = this.fb.group({
      id: '',
      testid: '',
      selectedOption: ''
      //question: ['', [Validators.required]],
      //answers: this.fb.array([this.addAnswersFormGroup()])
    });

    this.testService.getTests().subscribe(
      (all) => { this.testlist = all },
      (err) => console.log(err)
    )

    this.showTestLayout = true;
  }

  questionChange(id) {
    let objective = this.objectives.find(t => t.id === id);
    if (typeof objective === 'undefined') {
      return null;
    }
    this.objective = objective;
    this.objectiveForm.patchValue({ selectedOption: objective.selectedOption });
  }

  startNow(testid) {
    this.testId = testid;
    this.showTestLayout = false;

    if (testid) {
      let test:ITest;

      this.testService.getTest(testid).subscribe(e=>{
        test = e;
        let ids = [];
        e.objectiveIds.forEach(function(value:any){
          ids.push(value.id);
        })
        this.objectiveService.getObjectivesByIds(JSON.stringify(ids)).subscribe(t=>{
          this.objectives = t;
        })
      });

      // this.objectiveService.getObjectivesByTestId(testid)
      //   .pipe(
      //     map(t => {

      //       let list = t.map((item) => {
      //         let optionlist = item.options.map((optionitem) => {
      //           let op = new ObjectiveSelectOption(optionitem.id, optionitem.value);
      //           return op;
      //         })
      //         let k = new SelectObjective(item.id, item.testid, item.description, item.selectedOption, optionlist);
      //         return k
      //       });

      //       return list;
      //     })
      //   )
      //   .subscribe((objectives: SelectObjective[]) => {
      //     this.objectives = objectives;
      //   });
    }

    //this.hideNavigationHeaders.emit(this.showTestLayout);
  }

  // onSubmit(): void {

  //   //console.log(this.objectiveForm);


  //   // let form = this.objectiveForm.value;
  //   // let qa = this.examdata.find(t => t.id === form.id)
  //   // if (qa === undefined) {
  //   //   this.examdata.push(new ExamData(form.id, form.testid, form.selectedOption));
  //   // }
  //   // else {
  //   //   qa.selectedOption = form.selectedOption;
  //   // }
  // }
}


// subscribe(
//   (objectives: ISelectObjective[]) => {
//     this.objectives = objectives;
//   })
