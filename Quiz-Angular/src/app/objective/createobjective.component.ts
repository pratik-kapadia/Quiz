import { OnInit, Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { IObjective } from "src/models/objective";
import { ObjectiveService } from "src/objectiveService";
import { Router, ActivatedRoute } from "@angular/router";
import { ObjectiveOption } from "src/models/objectiveOption";

@Component({
  selector: 'create-objective',
  styleUrls: ['./createobjective.component.css'],
  templateUrl: './createobjective.component.html'
})
export class CreateObjectiveComponent implements OnInit {

  objectiveForm: FormGroup;
  objective: IObjective;
  constructor(private fb: FormBuilder, private objectiveService: ObjectiveService, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.objectiveForm = this.fb.group({
      question: ['', [Validators.required]],
      points:[0,[Validators.required]],
      options: this.fb.array([this.addAnswersFormGroup()])
    });

    this.activatedRoute.paramMap.subscribe(parmas => {
      debugger;
      let objectiveId = +parmas.get('id');
      if (objectiveId) {
        this.getObjective(objectiveId);
      }
      else {
        this.objective = {
          id: null,
          testid: null,
          description: '',
          options: [],
          selectedOption: ''
        }
      }
    });
  }

  addAnswersFormGroup(): FormGroup {
    return this.fb.group({
      id: 1,
      value: [''],
      isCorrect: [false]
    })
  };

  addAnswers(): void {
    (<FormArray>this.objectiveForm.get('options')).push(
      this.fb.group({
        id: this.objectiveForm.get('options').value.length + 1,
        value: [''],
        isCorrect: [false]
      })
    )
  }

  deleteAnswer(index:number):void{
    (<FormArray>this.objectiveForm.get('options')).removeAt(index);
  }

  onSubmit() {
    console.log(this.objectiveForm);
    this.mapFormToObjective();
    if (this.objective.id) {
      this.objectiveService.updateObjective(this.objective).subscribe(
        () => this.router.navigate(['/allobjectives']),
        (err: any) => console.log(err)
      );
    } else {
      this.objectiveService.addObjective(this.objective).subscribe(
        () => this.router.navigate(['/allobjectives']),
        (err: any) => console.log(err)
      )
    }
  }

  getObjective(id: number) {
    this.objectiveService.getObjective(id).subscribe(
      (objective: IObjective) => {
        this.editObjective(objective);
        this.objective = objective;
      },
      (err: any) => console.error(err)
    );
  }

  editObjective(objective: IObjective) {
    this.objectiveForm.patchValue({
      id: objective.id,
      question: objective.description,
    })

    this.objectiveForm.setControl('options', this.setExistingAnswers(objective.options));
  }

  setExistingAnswers(objectiveOptions: ObjectiveOption[]): FormArray {
    const formArray = new FormArray([]);
    objectiveOptions.forEach(o => {
      formArray.push(this.fb.group({
        id: o.id,
        value: o.value,
        isCorrect: o.isCorrect === null ? false : o.isCorrect
      }));
    });

    return formArray;
  }

  mapFormToObjective() {
    this.objective.description = this.objectiveForm.value.question;
    //this.objective.selectedOption = this.objectiveForm.value.selectedOption;
    this.objective.options = this.objectiveForm.value.options;
  }
}
