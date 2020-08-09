import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { IEmployee } from './IEmployee';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime,distinctUntilChanged,switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  employees: IEmployee[];
  filteredEmployees: IEmployee[];

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(
      (listEmployees) => this.filteredEmployees = this.employees = listEmployees,
      (err) => console.log(err)
    );
  }

  editButtonClick(id: number) {
    this.router.navigate(['/edit', id]);
  }

  checkMethod(searchTerm){
    searchTerm = searchTerm.trim();
    if(searchTerm){
      this.filteredEmployees = this.employees.filter((t: IEmployee) =>
      {
        return t.fullName.includes(searchTerm)
      });
    }
    else{
      this.filteredEmployees = this.employees;
    }
  }
}
