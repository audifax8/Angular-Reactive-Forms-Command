import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Apple } from '../shared/models';
import { AppleType } from '../shared/enums';

@Component({
  selector: 'app-apple',
  templateUrl: './apple.component.html',
  styleUrls: ['./apple.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppleComponent implements OnInit {
  @Input() apple$: BehaviorSubject<Apple>;
  @Input() cardTittle: string;

  appleType = AppleType;

  constructor() { }

  ngOnInit() {
  }

}
