import { Component, OnInit } from '@angular/core';
import { Observable, interval, Observer, pipe, BehaviorSubject } from 'rxjs';
import { map, tap, delay } from 'rxjs/operators';
import { Apple } from '../shared/models';
import { ConveyorStep, AppleType } from '../shared/enums';

@Component({
  selector: 'app-apple-conveyor',
  templateUrl: './apple-conveyor.component.html',
  styleUrls: ['./apple-conveyor.component.sass']
})
export class AppleConveyorComponent implements OnInit {

  NEW_APPLE_DELAY = 12000;

  PROCESS_TIME = 2000;

  conveyorSteps = ConveyorStep;

  ids = 0;

  redApplesCount$ = new BehaviorSubject<number>(0);

  greenApplesCount$ = new BehaviorSubject<number>(0);

  lastApple$ = new BehaviorSubject<Apple>(null);

  appleInMachine$ = new BehaviorSubject<Apple>(null);

  lastEvent$ = new BehaviorSubject<String>(null);

  reedApples$ = new BehaviorSubject<Apple[]>([]);

  greenApples$ = new BehaviorSubject<Apple[]>([]);

  appleStream = new Observable(appleObserver => {
    interval(this.NEW_APPLE_DELAY).subscribe(() => {
      const apple = this.generateRandomApple();
      appleObserver.next(apple);
      this.appleInMachine$.next(apple);
    });
  });

  constructor() { }

  ngOnInit() {
    const sub = this.appleStream
      .pipe(
        map((apple: Apple) => {
          apple.hasLabel = true;
          this.updateLastEvent(ConveyorStep.NEW_APPLE);
          this.appleInMachine$.next(apple);
          return apple;
        }
        ),
        delay(this.PROCESS_TIME),
        map((apple: Apple) => {
          apple.calculateWeight();
          this.updateLastEvent(ConveyorStep.CALCULATE_WEIGHT);
          this.appleInMachine$.next(apple);
          return apple;
        }),
        delay(this.PROCESS_TIME),
        map((apple: Apple) => {
          apple.calculatePrice();
          this.updateLastEvent(ConveyorStep.CALCULATE_PRICE);
          this.appleInMachine$.next(apple);
          return apple;
        }),
        delay(this.PROCESS_TIME),
        map((apple: Apple) => {
          if (apple.appleType === AppleType.RED) {
            this.updateLastEvent(ConveyorStep.ADD_RED_APPLE);
            this.redApplesCount$.next((this.redApplesCount$.value) + 1);
            this.reedApples$.next(
              this.reedApples$.value.concat(apple)
            );
          } else {
            this.updateLastEvent(ConveyorStep.ADD_GREEN_APPLE);
            this.greenApples$.next(
              this.greenApples$.value.concat(apple)
            );
            this.greenApplesCount$.next((this.greenApplesCount$.value) + 1);
          }
          this.updateLastEvent(ConveyorStep.FILTER_APPLE);
          this.appleInMachine$.next(apple);
          return apple;
        }),
        delay(this.PROCESS_TIME),
        map((apple: Apple) => {
          this.updateLastEvent(ConveyorStep.UPDATE_LAST_APPLE);
          this.lastApple$.next(apple);
          this.appleInMachine$.next(null);
          return apple;
        }),
        tap(apple => console.log(apple))
      )
      .subscribe();
  }

  public generateRandomApple(): Apple {
    this.ids++;
    const randomAppleType = Math.random() * (2 - 1) + 1;
    return new Apple(
      (randomAppleType < 1.5) ? AppleType.RED : AppleType.GREEN,
      false,
      this.ids
    );
  }

  public updateLastEvent(conveyorStep: ConveyorStep): void {
    this.lastEvent$.next(conveyorStep);
  }

  public isActiveStep(conveyorStep: ConveyorStep): boolean {
    return (this.lastEvent$.value === conveyorStep) ? true : false;
  }

}

