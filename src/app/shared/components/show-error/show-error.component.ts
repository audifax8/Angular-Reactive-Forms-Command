import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-show-error',
  templateUrl: './show-error.component.html',
  styleUrls: ['./show-error.component.sass']
})
export class ShowErrorComponent implements OnInit {
  @Input() formControl: FormControl;

  constructor() { }

  ngOnInit() {
  }

}
