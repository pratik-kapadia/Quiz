import { Component, OnInit } from '@angular/core';
import { ObjectiveService } from 'src/objectiveService';
import { IObjective } from 'src/models/objective';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ITest } from 'src/models/test';
import { TestService } from 'src/testService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {

  quizForm: FormGroup;
  objectives: IObjective[];
  testlist: ITest;

  constructor(private fb: FormBuilder, private router: Router, private objectiveService: ObjectiveService, private testService: TestService) { }

  ngOnInit() {

    this.quizForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required],
      duration: [15, Validators.required],
      objectives: this.fb.array([])
    });

    this.testlist = {
      id: null,
      title: null,
      description: '',
      objectiveIds: [],
      duration: 15
    }

    this.getAll();
  }

  onSubmit() {
    console.log(this.quizForm);
    this.mapFormToTestlist();
    this.testService.createTest(this.testlist).subscribe(
      () => this.router.navigate(['/dashboard']),
      (err: any) => console.log(err)
    )

  }
  getAll() {
    this.objectiveService.getObjectives().subscribe(
      (allObjectives) => { this.objectives = allObjectives },
      (err) => console.log(err));
  }

  addQuestionToList(event: any, value: any) {
    if (event.target.checked) {
      (<FormArray>this.quizForm.get('objectives')).push(
        this.fb.group({
          id: value.id
        })
      );
    }
    else {
      (<FormArray>this.quizForm.get('objectives')).removeAt(event.target);
    }
  }

  mapFormToTestlist() {
    this.testlist.title = this.quizForm.value.title;
    this.testlist.description = this.quizForm.value.description;
    this.testlist.duration = this.quizForm.value.duration;
    this.testlist.objectiveIds = this.quizForm.value.objectives;
  }
}
