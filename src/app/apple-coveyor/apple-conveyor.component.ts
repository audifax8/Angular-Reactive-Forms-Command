import { Component, OnInit } from '@angular/core';
import { Observable, interval, Observer, pipe, BehaviorSubject, Subscription } from 'rxjs';
import { map, tap, delay } from 'rxjs/operators';
import { Apple } from '../shared/models';
import { ConveyorStep, AppleType } from '../shared/enums';

@Component({
  selector: 'app-apple-conveyor',
  templateUrl: './apple-conveyor.component.html',
  styleUrls: ['./apple-conveyor.component.sass']
})
export class AppleConveyorComponent implements OnInit {

  NEW_APPLE_DELAY = 6000;

  PROCESS_TIME = 1000;

  conveyorSteps = ConveyorStep;

  ids = 0;

  redApplesCount$ = new BehaviorSubject<number>(0);

  greenApplesCount$ = new BehaviorSubject<number>(0);

  lastApple$ = new BehaviorSubject<Apple>(null);

  expensiveApple$ = new BehaviorSubject<Apple>(null);

  cheapestApple$ = new BehaviorSubject<Apple>(null);

  appleInMachine$ = new BehaviorSubject<Apple>(null);

  lastEvent$ = new BehaviorSubject<String>(null);

  reedApples$ = new BehaviorSubject<Apple[]>([]);

  greenApples$ = new BehaviorSubject<Apple[]>([]);

  isTurnOnCoveyor = false;

  appleStream = new Observable(appleObserver => {
    
      interval(this.NEW_APPLE_DELAY).subscribe(() => {
        if(this.isTurnOnCoveyor){
        const apple = this.generateRandomApple();
        appleObserver.next(apple);
        this.appleInMachine$.next(apple);
        }
      });
  });

  subscription;

  constructor() { }

  ngOnInit() {
    this.subscription = this.appleStream
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
          this.updateExpensiveApple(apple);
          this.updateCheapestApple(apple);
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
            this.greenApplesCount$.next((this.greenApplesCount$.value) + 1);
            this.greenApples$.next(
              this.greenApples$.value.concat(apple)
            );
            
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
      ).subscribe();
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

  public getAppleEmoji(conveyorStep: ConveyorStep): string {
    if (this.isActiveStep(conveyorStep)) {
      return (!this.appleInMachine$.value) ? '' : (this.appleInMachine$.value.appleType === AppleType.RED) ? '🍎' : '🍏';
    }
    return '';
  }

  public getAppleEmojiByType(apple: Apple): string {
    return (apple.appleType === AppleType.RED) ? '🍎' : '🍏';
  }

  private updateExpensiveApple(newApple: Apple): void {
    const expensiveApple = this.expensiveApple$.value;
    if (!expensiveApple) {
      this.expensiveApple$.next(newApple);
    } else {
      this.expensiveApple$.next((newApple.price > expensiveApple.price) ? newApple : expensiveApple);
    }
  }

  private updateCheapestApple(newApple: Apple): void {
    const cheapestApple = this.cheapestApple$.value;
    if (!cheapestApple) {
      this.cheapestApple$.next(newApple);
    } else {
      this.cheapestApple$.next((newApple.price < cheapestApple.price) ? newApple : cheapestApple);
    }
  }

  public turnConveyor(value): void {
    this.isTurnOnCoveyor = value;
  }

}

