import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Home } from '../home';
import { UserService } from '../../app/services/user-service';
import { FormsModule } from "@angular/forms";
import { User } from '../../app/types/User';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit, OnDestroy{
[x: string]: any;
  
  // @Input() user: string = "";
  @Input() userIndex: number = -1;
  @Input() addMode: boolean = false;
  // @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();
  protected userService = inject(UserService);
  protected route = inject(ActivatedRoute);
  public willEdit: boolean = false;
  userForEdit: User = {...this.userService.emptyUser}
  
  ngOnInit(): void {
    console.log("created");
  }
  ngOnDestroy(): void {
    console.log("Destroy");
  }

  subscribeParams(){
    this.route.params.subscribe(params => {
      console.log(params)
    })
  }
  editMode(editMode: boolean, user: User = {...this.userService.emptyUser}) {
    this.willEdit = editMode;
    this.userForEdit = {...user};
    if (!editMode){
      this.userService.usersHaveChanged.next(true);
    }
  }
  
  submitEdit(){
    if(this.addMode){
      this.userService.addUser(this.userForEdit)
    } else{

      this.userService.editUser(this.userForEdit, )
      this.willEdit = false;
    }
  }
}
