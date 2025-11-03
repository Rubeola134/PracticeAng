import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Home } from '../home';
import { UserService } from '../../app/services/user-service';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-users',
  imports: [FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit, OnDestroy{
  
  // @Input() user: string = "";
  @Input() userIndex: number = -1;
  // @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();
  protected userService = inject(UserService);
  public willEdit: boolean = false;
  protected userForEdit: string = "";
  
  ngOnInit(): void {
    console.log("created");
  }
  ngOnDestroy(): void {
    console.log("Destroy");
  }
  editMode(editMode: boolean, user: string = "") {
    this.willEdit = editMode;
    this.userForEdit = user;
  }
  
  submitEdit(){
    this.userService.editUser(this.userForEdit, this.userIndex)
    this.willEdit = false;
  }
}
