import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected http = inject(HttpClient)
  public willShowUser: boolean = true;
  private colorSource = new BehaviorSubject<string>('bg-blue-500');
  color$ = this.colorSource.asObservable();
  toggleColor() {
    const next = this.colorSource.value === 'bg-blue-500' ? 'bg-purple-500' : 'bg-blue-500';
    this.colorSource.next(next);
  }
  userList = [
    "Tucker Anselm",
    "Elmira Keddy",
    "Eveline Grandisson",
    "Berry Wildes",
    "Quintus Hastings",
    "Harp Antonignetti",
    "Vite Playfair",
    "Noelle Dowears",
    "Delcine Lubbock",
    "Auberta Skerrett",
    "Constantin Cosgry",
    "Loleta Grenfell",
    "Nadeen Matchett",
    "Elli Galliver",
    "Gayla Hawtin",
    "Liam Antwis",
    "Merilyn Baumford",
    "Lilas Colquyte",
    "Roi Kinworthy",
    "Patin Flecknoe",
    "Etienne Vedeneev",
    "Diane Evesque",
    "Ashlee Amoore",
    "Julissa Bandey",
    "Merridie McPartling",
    "Nanete Kitlee"        
];

getUsers(){
  return this.http.get("http://localhost:3000/user/users", )
}

removeUser(index: number){
  this.userList.splice(index, 1)
}

editUser(user: string, index: number){
  this.userList[index] = user;
}
}
