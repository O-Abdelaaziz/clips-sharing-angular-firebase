import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input()
  public control: FormControl = new FormControl();
  @Input()
  public type: string = 'text';
  @Input()
  public placeHolder: string = '';
  @Input()
  public format = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}
