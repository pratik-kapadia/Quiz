import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter, map, tap, flatMap } from 'rxjs/operators';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

@Injectable({
  providedIn: 'root'
})
export class UsersViewService {

  users;
  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:3000/users');

  }

  searchUsers(term: string) {

    return this.getAllUsers()
      .pipe(
        map(users =>
          users.filter(
            t => t.firstName.toLowerCase().indexOf(term.toLowerCase()) !== -1)
        )
      )
  }

}
