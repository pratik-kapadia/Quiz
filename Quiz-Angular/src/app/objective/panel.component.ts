import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ObjectiveService } from "src/objectiveService";
import { IObjective } from "../../models/objective";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, Validators, FormBuilder, FormArray } from "@angular/forms";
import { ObjectiveOption } from "src/models/objectiveOption";

@Component({
  selector: 'panel',
  styleUrls: ['./panel.component.css'],
  templateUrl: './panel.component.html'
})
export class PanelComponent implements OnInit, AfterViewInit {

  objective: IObjective;
  objectives: IObjective[];
  objectiveForm: FormGroup;
  objectiveId

  currentIndex: number;
  constructor(private fb: FormBuilder, private objectiveService: ObjectiveService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  addAnswersFormGroup(): FormGroup {
    return this.fb.group({
      id: 1,
      value: [''],
      selectedOption: ['']
    })
  };

  ngAfterViewInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      const testid = +params.get('testid');

      if (testid) {
        this.objectiveService.getObjectivesByTestId(testid).subscribe(
          (objectives: IObjective[]) => {
            this.objectives = objectives;

            //  this.objectiveForm.patchValue({
            //    id:this.objective.id,
            //    question: this.objective.description
            //  })

            //  this.objectiveForm.setControl('answers',this.setExistingAnswers(this.objective.options));

            //  let test = this.objectiveForm.get('answers');
          },
          (err: any) => console.error(err)
        );
      }
    });
  }

  ngOnInit() {

    this.objectiveForm = this.fb.group({
      id: '',
      question: ['', [Validators.required]],
      //answers: this.fb.array([this.addAnswersFormGroup()])
      options:[[],[Validators.required]],
      selectedOption:['',Validators.required]
    });

    // this.activatedRoute.paramMap.subscribe(params => {
    //    this.objectiveId = +params.get('id');
    //    this.currentIndex = +params.get('index');
    //   const testid = +params.get('testid');

    //   if (this.objectiveId) {
    //     this.objectiveService.getObjective(this.objectiveId).subscribe(
    //       (objective: IObjective) => {
    //         this.objective = objective;

    //         this.objectiveForm.patchValue({
    //           id:this.objective.id,
    //           question: this.objective.description
    //         })

    //         this.objectiveForm.setControl('answers',this.setExistingAnswers(this.objective.options));

    //         let test = this.objectiveForm.get('answers');
    //       },
    //       (err: any) => console.error(err)
    //     );
    //   }
    // })


  }

  questionChange(questionId) {
    this.objective = this.objectives.find(t=>t.id == questionId);
    this.objectiveForm.patchValue({
      id: this.objective.id,
      question: this.objective.description,
      options: this.objective.options,
      selectedOption: this.objective.selectedOption
    })

    //this.objectiveForm.setControl('answers', this.setExistingAnswers(this.objective.options));
  }

  setExistingAnswers(objectiveOptions: ObjectiveOption[]): FormArray {
    const formArray = new FormArray([]);
    objectiveOptions.forEach(o => {
      formArray.push(this.fb.group({
        id: o.id,
        value: o.value,
        isCorrect: o.isCorrect,
        selectedOption: ''
      }));
    });

    return formArray;
  }

  onSubmit() {
    debugger;
    console.log(this.objectiveForm);
    this.mapFormToObjective();
    this.objectiveService.updateObjective(this.objective).subscribe(
      () => //this.router.navigate(['/panel']),
      (err: any) => console.log(err)
    );
  }

  mapFormToObjective() {
    this.objective.description = this.objectiveForm.value.question;
    this.objective.selectedOption = this.objectiveForm.value.selectedOption;
    this.objective.options = this.objectiveForm.value.answers;
  }

  reset(){
    this.objectiveForm.controls['selectedOption'].reset();
  }
}
