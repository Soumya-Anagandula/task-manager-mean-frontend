import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Task} from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model'

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent {
constructor(private taskService : TaskService,private router: Router){ }

  // createList(title : string){
  //   this.taskService.createList(title).subscribe((list : List) =>{
  //     console.log(list);
  //      //now we navigate to lists/response._id
  //   this.router.navigate(['/lists', list._id]);

  // });
 
  // }
  createList(title: string) {
    this.taskService.createList(title).subscribe(next => {
      const list: List = next as List;
      console.log(list);

      this.router.navigate([ '/lists', list._id ]);
    })
  }
}

