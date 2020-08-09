
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { IObjective } from "./models/objective";
import { catchError } from "rxjs/operators";
import { ITest } from "./models/test";
import { ITestResult } from "./models/testResult";

@Injectable({
  providedIn: 'root'
})
export class TestResultService {
  baseUrl = 'http://localhost:3000/testresult';

  constructor(private httpClient: HttpClient) {

  }

  getTestResults(): Observable<ITestResult[]> {
    return this.httpClient.get<ITestResult[]>(`${this.baseUrl}`).pipe(catchError(this.handleError));
  }

  getTestResultByQuestionId(userid,testid,qid): Observable<ITestResult> {
    return this.httpClient.get<ITestResult>(`${this.baseUrl}/${userid}/${testid}/${qid}`).pipe(catchError(this.handleError));
  }

  getTestResultByTestId(userid,testid): Observable<ITestResult> {
    return this.httpClient.get<ITestResult>(`${this.baseUrl}/${userid}/${testid}`).pipe(catchError(this.handleError));
  }

  upsertResult(testResult: ITestResult): Observable<ITestResult> {
    return this.httpClient.post<ITestResult>(this.baseUrl, testResult, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

  endTest(testResults: ITestResult[]): Observable<ITestResult> {
    return this.httpClient.post<ITestResult>(this.baseUrl, testResults, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

  // updateResult(testResult: ITestResult): Observable<ITestResult> {
  //   return this.httpClient.put<ITestResult>(`${this.baseUrl}/${testResult.userid}`, testResult, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   })
  //     .pipe(catchError(this.handleError));
  // }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }
}
