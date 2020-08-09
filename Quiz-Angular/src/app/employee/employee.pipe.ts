import { PipeTransform, Pipe } from "@angular/core";
import { IEmployee } from "./IEmployee";

@Pipe({
  name:'EmployeeFilter'
})

export class EmployeePipe implements PipeTransform {

  transform(employees: IEmployee[], term: string): any {
    if (!employees) return null;
    if (!term) return employees;

    return employees.filter(function (item) {
      return JSON.stringify(item).toLowerCase().includes(term);
    });
  }
}
