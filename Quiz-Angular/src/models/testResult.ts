import { ExamData } from "./examdata";

export interface ITestResult{
  _id:string,
  userid:number,
  testid:number,
  examdata:ExamData[]
}

// export interface ISubmitQuestionAnswer{
//   id:number,
//   userid:number,
//   examdata:ExamData
// }
