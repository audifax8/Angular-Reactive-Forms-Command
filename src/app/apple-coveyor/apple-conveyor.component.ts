import { Component, OnInit } from '@angular/core';
import { of, Observable, interval, Observer, pipe, BehaviorSubject } from 'rxjs';
import { map, tap, delay } from 'rxjs/operators';

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
            this.redApplesCount$.next((this.redApplesCount$.value) + 1);
          } else {
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

class Apple {
  id: number;
  appleType: AppleType;
  hasLabel: Boolean;
  price: number;
  weight: number;
  constructor(appleType, hasLabel, id) {
    this.id = id;
    this.appleType = appleType;
    this.hasLabel = hasLabel;
    this.price = 0;
    this.weight = 0;
  }

  public calculateWeight(): void {
    this.weight = Math.random() * (4 - 1) + 1;
  }
  public calculatePrice(): void {
    this.price = this.weight * 1.5;
  }
}

enum AppleType {
  RED = 1,
  GREEN = 2
}

enum ConveyorStep {
  NEW_APPLE = "New Apple",
  CALCULATE_WEIGHT = "Calculate Weight",
  CALCULATE_PRICE = "Calculate Price",
  FILTER_APPLE = "Filter Apple",
  UPDATE_LAST_APPLE = "Update Last Apple"
}
