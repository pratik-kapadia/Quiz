import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelectObjective, IObjective } from 'src/models/objective';
import { TestService } from 'src/testService';
import { ObjectiveService } from 'src/objectiveService';
import { Router } from '@angular/router';
import { ITestResult } from 'src/models/testResult';
import { TestResultService } from 'src/testResultService';
import { ExamData } from 'src/models/examdata';
import { DataService } from 'src/dataservice';

@Component({
  selector: 'question-options',
  templateUrl: './question-options.component.html',
  styleUrls: ['./question-options.component.css']
})
export class QuestionOptionsComponent implements OnInit, OnChanges {

  @Input() testid: number;
  testResultId: string;
  @Input() objective: SelectObjective;
  @Input() objectiveForm: FormGroup;
  questionAnswerForm: FormGroup;
  objectives: SelectObjective[];
  testResults: ITestResult;
  currentTestResult: ITestResult;
  currentUser;
  correctAnswer: number;
  isShowAnswer: boolean;

  constructor(private fb: FormBuilder,
    private testResultService: TestResultService,
    private objectiveService: ObjectiveService,
    private dataService: DataService,
    private router: Router) {

  }

  ngOnInit() {
    this.questionAnswerForm = this.fb.group({
      _id: '',
      qid: '',
      testid: this.testid,
      selectedOption: ''
    });

    this.currentTestResult = {
      _id: '',
      userid: 0,
      testid: 0,
      examdata: []
    };

  }

  ngOnChanges() {
    this.correctAnswer = 0;
    this.isShowAnswer = false;
    this.currentUser = this.dataService.getCurrentUser();
    this.testResults = this.dataService.getExamResult();
    //this.testResultService.getTestResultByTestId(this.currentUser.id, this.testid).subscribe
    this.questionAnswerForm = this.fb.group({
      _id: '',
      qid: '',
      testid: '',
      selectedOption: ''
    });

    if (this.testResults) {
      //this.currentTestResult = this.testResults.find(t => t.id = this.questionAnswerForm.value.id);

      if (this.testid && this.objective.id && this.testResults) {
        //get test result
        this.getObjective(this.objective.id)
      }
      else {
        //this.testResult.push

      }
    }
  }

  onChange(qid, selectedOption) {
    this.objective.selectedOption = selectedOption;
  }

  getObjective(id: number) {
    this.testResultService.getTestResultByQuestionId(this.currentUser.id, this.testid, id)
      .subscribe(
        (result: ITestResult) => {
          this.editObjective(result);
        },
        (err: any) => console.log(err)
      );
  }

  editObjective(result: ITestResult) {
    this.questionAnswerForm.patchValue({
      _id: result._id,
      userid: result.userid,
      examdata: result.examdata
    })
  }

  onResetAnswer() {
    this.objectiveForm.patchValue({
      selectedOption: ''
    });
  }

  showAnswer() {
    this.objectiveService.getObjective(this.objectiveForm.value.id)
      .subscribe(
        (data) => {
          let correctAnswer = data.options.find(t => t.isCorrect);
          this.correctAnswer = correctAnswer.id;
          this.isShowAnswer = true;
        },
        (err) => { console.log(err) }
      )
  }

  onSubmit() {
    this.mapFormToObjective();

    this.testResultService.upsertResult(this.currentTestResult)
      .subscribe(
        (data) => {
          this.testResultId = data._id;
          this.dataService.updateExamResult(data);
        },
        (err: any) => console.log(err)
      );
  }

  mapFormToObjective() {
    // this.currentTestResult = {
    //   id: 0,
    //   userid: 0,
    //   testid:0,
    //   examdata: []
    // };
    this.currentTestResult._id = this.testResultId === undefined ? '' : this.testResultId;
    this.currentTestResult.userid = 123;
    this.currentTestResult.testid = this.testid;
    let examdata = this.currentTestResult.examdata.find(t => t.qid == this.objectiveForm.value.id);
    if (examdata) {
      examdata.selectedOption = this.objectiveForm.value.selectedOption;
    }
    else {
      this.currentTestResult.examdata.push({
        qid: this.objectiveForm.value.id,
        selectedOption: this.objectiveForm.value.selectedOption
      });
    }
  }
}
