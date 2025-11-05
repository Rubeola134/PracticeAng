import { Component, HostListener, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Users } from "./users/users";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../app/services/user-service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../app/types/User';
import { Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [Users, FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy{
  protected hello: string = "Hello World"
  protected clicked: number = 0;
  protected willShowBlock: boolean = true;
  protected arr: number[] = [1,2,3,4,5]
  protected contextClicked: boolean = false;
  addindNewUser: boolean = false;
  usersHasChangedSubscription: Subscription = new Subscription();
  userSearch: string = "";
//   userList = [
//     "Tucker Anselm",
//     "Elmira Keddy",
//     "Eveline Grandisson",
//     "Berry Wildes",
//     "Quintus Hastings",
//     "Harp Antonignetti",
//     "Vite Playfair",
//     "Noelle Dowears",
//     "Delcine Lubbock",
//     "Auberta Skerrett",
//     "Constantin Cosgry",
//     "Loleta Grenfell",
//     "Nadeen Matchett",
//     "Elli Galliver",
//     "Gayla Hawtin",
//     "Liam Antwis",
//     "Merilyn Baumford",
//     "Lilas Colquyte",
//     "Roi Kinworthy",
//     "Patin Flecknoe",
//     "Etienne Vedeneev",
//     "Diane Evesque",
//     "Ashlee Amoore",
//     "Julissa Bandey",
//     "Merridie McPartling",
//     "Nanete Kitlee"        
// ]

  contextMenuInfo: any = {
    pageX: 0,
    pageY: 0,
    willShow: false
  };
  tooltipInfo: any = {
    pageX: 0,
    pageY: 0,
    willShow: false
  };

  constructor(protected userService: UserService) {

  }
  ngOnInit(): void {
    this.getUsers();
    this.usersHasChangedSubscription = this.userService.usersHaveChanged.subscribe((changesCanceled: boolean) =>{
      if(!changesCanceled){
        this.getUsers();
      }
      this.addindNewUser = false;
    })
  }
  ngOnDestroy(): void {
    this.usersHasChangedSubscription.unsubscribe();
  }

  addNewUser(){
    this.addindNewUser = true;
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
    if(!this.userSearch){
      this.userService.getUsers().subscribe(responseObject);
    }else{
    }
    this.userService.getUsers(this.userSearch).subscribe(responseObject);
  }





  incrementClicked(){
    this.clicked += 1;
  }

  toggleContextMenu(showContextMenu: boolean, event: MouseEvent | null){
    console.log(event);
    if(event !== null){
      event.preventDefault();
      this.contextMenuInfo.pageX = event.pageX
      this.contextMenuInfo.pageY =  event.pageY
    }

    this.contextMenuInfo.willShow = showContextMenu;
  }

  @HostListener("document:click")
  closeContextMenu(){
    setTimeout(() => {
      if(!this.contextClicked) this.toggleContextMenu(false, null)
    }, 10);

  }

  contextClick(){
    this.contextClicked = true;
    setTimeout(() =>{
      this.contextClicked = false;
    }, 20)
  }

  onMouseMove(inside: boolean, event: MouseEvent){
    if(this.tooltipInfo.willShow !== inside){
      this.tooltipInfo.willShow = inside;
    }

    this.tooltipInfo.pageX = event.pageX - 65;
    this.tooltipInfo.pageY =  event.pageY + 15;
    console.log(event);
  }

  setShowUsers(showUsers: boolean){
    this.userService.willShowUser = showUsers;
  }

  

  // removeUser(index: number){
  //   this.userService.userList.splice(index, 1)
  // }


}
