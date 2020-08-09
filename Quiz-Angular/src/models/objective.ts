import { ObjectiveOption } from "./objectiveOption";
import { ObjectiveSelectOption } from "./objectiveSelectOption";

export interface IObjective{
  id:number,
  testid:number,
  description:string,
  selectedOption:string,
  options: ObjectiveOption[]
}

export class SelectObjective{
  /**
   *
   */
  constructor(public id:number,public testid:number,public description:string,public selectedOption:string,public options:ObjectiveSelectOption[]) {

  }
  // public id:number;
  // public description:string;
  // public selectedOption:string;
  // public options: ObjectiveSelectOption[]
}
