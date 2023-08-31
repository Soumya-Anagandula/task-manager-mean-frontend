import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit{

  lists! : any;
  tasks! :any;
  selectedListId : string;

  constructor(private taskService:TaskService,private route:ActivatedRoute,private router: Router) { }
  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        if(params?.['listId']){
         // console.log(params);
         this.selectedListId = params['listId'];
        this.taskService.getTasks(params?.['listId']).subscribe((tasks : any) => {
          this.tasks=tasks;
       })
      }
       else {
        this.tasks = undefined;
      }
        
        
      })
     this.taskService.getLists().subscribe((lists:any) =>{
       this.lists = lists;
      })  
  }
  onTaskClick(task : Task) {
    //we want to set the task to complete
    this.taskService.complete(task).subscribe(() =>{
      console.log("completed successfully");
      task.completed = !task.completed;
    });
  }
  onDelete(){
    this.taskService.dellist(this.selectedListId).subscribe((res:any) =>{
      this.router.navigate(['/lists']);
      console.log("deleted");
    });
  }
  ondeleteTask(id:string){
    this.taskService.delTask(this.selectedListId,id).subscribe((res:any) =>{
      this.tasks = this.tasks.filter((val: any) => val._id!==id);
      console.log("deleted");
    });
  }
 
  
}
