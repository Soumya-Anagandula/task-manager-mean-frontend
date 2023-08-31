import { Injectable } from '@angular/core';
import { WebrequestService } from './webrequest.service';
import { Task } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService : WebrequestService) { }
  //we want to send a web rew to create a list
  
   getLists(){
     return this.webReqService.get('lists'); 
   }

   createList(title :string){
    return this.webReqService.post('lists',{ title});

  }
  updateList(id :string,title:string){
    return this.webReqService.patch(`lists/${id}`,{ title});
  }
  updateTask(listId: string,taskId :string,title:string){
    return this.webReqService.patch(`lists/${listId}/tasks/${taskId}`,{ title});
  }
  dellist(id: string){
    return this.webReqService.delete(`lists/${id}`)

  }
  delTask(listId: string,TaskId :string){
    return this.webReqService.delete(`lists/${listId}/tasks/${TaskId}`)

  }
  getTasks(listId: string){
    return this.webReqService.get(`lists/${listId}/tasks`);

  }
  createTask(title :string,listId: string){
    return this.webReqService.post(`lists/${listId}/tasks`,{ title});
  }
  complete(task : Task){
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed : !task.completed
    })
  }
  
}
