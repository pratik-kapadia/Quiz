
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { IObjective } from "./models/objective";
import { catchError } from "rxjs/operators";
import { ITest } from "./models/test";

@Injectable({
  providedIn: 'root'
})
export class TestService {
  baseUrl = 'http://localhost:3000/testlist';

  constructor(private httpClient: HttpClient) {

  }

  getTests(): Observable<ITest[]> {
    return this.httpClient.get<ITest[]>(`${this.baseUrl}`).pipe(catchError(this.handleError));
  }

  getTest(id): Observable<ITest> {
    return this.httpClient.get<ITest>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
  }

  createTest(test: ITest) {
    return this.httpClient.post(this.baseUrl, test, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // getObjective(id): Observable<IObjective> {
  //   return this.httpClient.get<IObjective>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
  // }

  // addResult(testResult: TestResult): Observable<TestResult> {
  //   return this.httpClient.post<TestResult>(this.baseUrl, testResult, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   })
  //     .pipe(catchError(this.handleError));
  // }

  // updateResult(testResult: TestResult): Observable<TestResult> {
  //   return this.httpClient.put<TestResult>(`${this.baseUrl}/${testResult.userid}`, objective, {
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
