import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../types/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected http = inject(HttpClient)
  public willShowUser: boolean = true;
  private colorSource = new BehaviorSubject<string>('bg-blue-500');
  usersHaveChanged: Subject<boolean> = new Subject<boolean>();
  color$ = this.colorSource.asObservable();
  toggleColor() {
    const next = this.colorSource.value === 'bg-blue-500' ? 'bg-purple-500' : 'bg-blue-500';
    this.colorSource.next(next);
  }
  userList: User[] = [];
  emptyUser: User = {
    userId: 0,
    username: '',
    fullName: '',
    city: '',
    gender: '',
    favoriteColor: '',
    favoriteAnimal: ''
  };


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
// ];

getUsers(searchText: string = ""){
  if(!searchText){
    return this.http.get<User[]>("http://localhost:3000/user/users")
  }else {
    return this.http.get<User[]>("http://localhost:3000/user/userSearch/" + searchText)
  }
}

removeUser(userId: number){
  if(confirm("U sure u want to delete?")){

    this.deleteUser(userId).subscribe({
      next: () =>{
        alert("The delete worked gangilang")
        this.usersHaveChanged.next(false);
      },
      error: (err) =>{
        console.log(err);
        alert("The User delete failed!!!")
      }
    })
  }
}

editUser(user: User){
  //this.userList[index] = user;
  this.putUser(user).subscribe({
    next: () =>{
      alert("The edit worked gangilang")
      this.usersHaveChanged.next(false);
    },
    error: (err) =>{
      console.log(err);
      alert("The User edit failed!!!")
    }
  })
}

addUser(user: User){
  //this.userList[index] = user;
  this.postUser(user).subscribe({
    next: () =>{
      alert("added user")
      this.usersHaveChanged.next(false);
    },
    error: (err) =>{
      console.log(err);
      alert("The User add failed!!!")
    }
  })
}

postUser(userForAdd: User){
  return this.http.post<User[]>("http://localhost:3000/user/addUser", userForAdd)
}

putUser(userForEdit: User){
  return this.http.put<User[]>("http://localhost:3000/user/editUser", userForEdit)
}

deleteUser(userId: number){
  return this.http.delete<User[]>("http://localhost:3000/user/deleteUser/" + userId)
}
}
