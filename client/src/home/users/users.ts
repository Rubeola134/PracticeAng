import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Home } from '../home';
import { UserService } from '../../app/services/user-service';
import { FormsModule } from "@angular/forms";
import { User } from '../../app/types/User';
import { Observer, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
  @Input() userSearch: string = "";
  // @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();
  protected userService = inject(UserService);
  protected route = inject(ActivatedRoute);
  public willEdit: boolean = false;
  userForEdit: User = {...this.userService.emptyUser}
  displayUser: boolean = false;
  userId: number = -1;
  userForDisplay: User =  {...this.userService.emptyUser}
  
  ngOnInit(): void {
    debugger;
   this.getUsers();
   this.subscribeParams();
   this.setUserForDisplay();
  }
  ngOnDestroy(): void {
    console.log("Destroy");
  }

  setUserForDisplay(){
    if(this.userIndex !== -1){
      this.userForDisplay = this.userService.userList[this.userIndex]
      this.displayUser = true;

    }
  }

  subscribeParams(){
    this.route.params.subscribe(params => {
      console.log(params["userId"])
      this.userId = params["userId"];
      if(params["userId"]){
        this.userId = +params["userId"];
        this.userService.getSingleUser(this.userId).subscribe({
          next: (res) =>{
            this.userForDisplay = res;
            this.displayUser = true;
          },
          error: (err) =>{
            console.log(err)
          }
        })

      }
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

  getUsers(){
    let responseObject: Partial<Observer<User[]>> = {
      
        next: (res: User[]) => {
          this.userService.userList = res;
          // res.forEach((row: User) => {
          //   console.log(row.username + " " + row.city)
          // })
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
    }
      this.userService.getUsers().subscribe(responseObject)
  }
}
