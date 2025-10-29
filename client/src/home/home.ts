import { Component, HostListener } from '@angular/core';
import { Users } from "../users/users";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [Users, FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected hello: string = "Hello World"
  protected clicked: number = 0;
  protected willShowBlock: boolean = true;
  protected arr: number[] = [1,2,3,4,5]
  protected contextClicked: boolean = false;
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

}
