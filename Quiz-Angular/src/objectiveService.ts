
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { IObjective, SelectObjective } from "./models/objective";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ObjectiveService {
  baseUrl = 'http://localhost:3000/objectives';

  constructor(private httpClient: HttpClient) {

  }

  getObjectives(): Observable<IObjective[]> {
    return this.httpClient.get<IObjective[]>(`${this.baseUrl}`).pipe(catchError(this.handleError));
  }

  getObjectivesByIds(ids): Observable<IObjective[]> {
    return this.httpClient.get<IObjective[]>(`${this.baseUrl}/ids/${ids}`).pipe(catchError(this.handleError));
  }

  getObjectivesByTestId(testid: number): Observable<IObjective[]> {
    return this.httpClient.get<IObjective[]>(`${this.baseUrl}/test/${testid}`).pipe(catchError(this.handleError));
  }

  getObjective(id): Observable<IObjective> {
    return this.httpClient.get<IObjective>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
  }

  addObjective(objective: IObjective): Observable<IObjective> {
    return this.httpClient.post<IObjective>(this.baseUrl, objective, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

  updateObjective(objective: IObjective): Observable<IObjective> {
    return this.httpClient.post<IObjective>(`${this.baseUrl}/${objective.id}`, objective, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }
}
