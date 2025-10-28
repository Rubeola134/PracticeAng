import { Component } from '@angular/core';
import { Users } from "../users/users";

@Component({
  selector: 'app-home',
  imports: [Users],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected hello: string = "Hello World"
  protected clicked: number = 0;

  incrementClicked(){
    this.clicked += 1;
  }

}
