import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(user: any, searchTerm: string): any {
    if(!user || !searchTerm)
    return user

    return
  }

}
