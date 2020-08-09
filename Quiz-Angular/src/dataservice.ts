
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { IObjective, SelectObjective } from "./models/objective";
import { map, catchError } from "rxjs/operators";
import { ObjectiveService } from "./objectiveService";
import { ObjectiveSelectOption } from "./models/objectiveSelectOption";
import { ITestResult } from "./models/testResult";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private selectedObjective: SelectObjective;
  private selectedObjectives: SelectObjective[];
  private objectives: SelectObjective[];
  private examResult: ITestResult;
  private currentUser;
  constructor(private objectiveService: ObjectiveService) {
    this.examResult = {
      _id:'',
      userid:0,
      testid:0,
      examdata:[]
    }
  }

  setSelectedObjective() {

  }

  getExamResult() {
    return this.examResult;
  }
  updateExamResult(result: ITestResult) {
    //let existingResult = this.examResult;
    // if (!existingResult) {
      this.examResult = result;
    // }
    // else {
    //  // existingResult.examdata.selectedOption = result.examdata.selectedOption;
    // }
  }
  getObjective(id) {
    this.objectives
  }

  getCurrentUser() {
    this.currentUser = { id: 123, name: 'pratik' };
    return this.currentUser;
  }

  getObjectives(testid) {
    if (testid) {
      this.objectiveService.getObjectivesByTestId(testid)
        .pipe(
          map(t => {

            let list = t.map((item) => {
              let optionlist = item.options.map((optionitem) => {
                let op = new ObjectiveSelectOption(optionitem.id, optionitem.value);
                return op;
              })
              let k = new SelectObjective(item.id, item.testid, item.description, item.selectedOption, optionlist);
              return k
            });

            return list;
          })
        )
        .subscribe((objectives: SelectObjective[]) => {
          this.objectives = objectives;
        });
    }
  }
}
