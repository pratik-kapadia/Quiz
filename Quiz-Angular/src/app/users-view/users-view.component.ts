import { Component, OnInit } from '@angular/core';
import { UsersViewService } from './users-view.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})
export class UsersViewComponent implements OnInit {

  filteredUsers;
  searchTerm : Subject<string> = new Subject<string>();
  constructor(private usersViewService: UsersViewService) {
    this.usersViewService.getAllUsers()
    .subscribe((users:any) =>{
      this.filteredUsers = users;
     })
   }

  ngOnInit() {
    this.searchTerm.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap(terms => this.usersViewService.searchUsers(terms))
    )
    .subscribe((users:any) =>{
      this.filteredUsers = users;
     })

  }

  searchUser(u: string) {
    this.searchTerm.next(u);
  }




  //   this.usersViewService.getAllUsers().pipe(
  //     debounceTime(2000),
  //     distinctUntilChanged()
  //   )
  //     .subscribe(users => {
  //       this.filteredUsers = this.users.filter(u => u.firstName.toLowerCase().indexOf(u.toLowerCase()) !== -1);
  //     });


  // }
}
