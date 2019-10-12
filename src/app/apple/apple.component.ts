import { Component, OnInit, Input } from '@angular/core';
import { Apple } from '../shared/models';
import { AppleType } from '../shared/enums';

@Component({
  selector: 'app-apple',
  templateUrl: './apple.component.html',
  styleUrls: ['./apple.component.sass']
})
export class AppleComponent implements OnInit {
  @Input() apple: Apple;
  @Input() cardTittle: string;

  appleType = AppleType;

  constructor() { }

  ngOnInit() {
  }

  public getClassType(type): string {
    if (type === 'border') {
      return (!this.apple) ? '' : (this.apple.appleType === AppleType.RED) ? 'border-danger' : 'border-success';
    }
    return (!this.apple) ? '' : (this.apple.appleType === AppleType.RED) ? 'text-danger' : 'text-success';
  }

}
