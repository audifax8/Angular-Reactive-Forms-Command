import { Component, OnInit } from '@angular/core';
import { of, Observable, interval, Observer, pipe, BehaviorSubject } from 'rxjs';
import { map, tap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-apple',
  templateUrl: './apple.component.html',
  styleUrls: ['./apple.component.sass']
})
export class AppleComponent implements OnInit {

  ids = 0;

  redApplesCount$ = new BehaviorSubject<number>(0);

  greenApplesCount$ = new BehaviorSubject<number>(0);

  lastApple$ = new BehaviorSubject<Apple>(null);

  appleInMachine$ = new BehaviorSubject<Apple>(null);

  lastEvent$ = new BehaviorSubject<String>(null);

  appleStream = new Observable(appleObserver => {
    interval(7000).subscribe(() => {
      const apple = this.generateRandomApple();
      appleObserver.next(apple);
      this.appleInMachine$.next(apple);
    });
  });


  constructor() { }

  ngOnInit() {

    /*this.redApplesCount$.subscribe(value => console.log('Red count updated: ' + value));


    this.greenApplesCount$.subscribe(value => console.log('Green count updated: ' + value));


    this.lastApple$.subscribe(value => console.log('Last Apple emited: ' + JSON.stringify(value)));


    this.lastEvent$.subscribe(value => console.log('Last Event: ' + JSON.stringify(value)));*/

    const sub = this.appleStream
      .pipe(
        map((apple: Apple) => {
          apple.hasLabel = true;
          this.lastEvent$.next("new Apple");
          this.appleInMachine$.next(apple);
          return apple;
        }
        ),
        delay(1000),
        map((apple: Apple) => {
          apple.calculateWeight();
          this.lastEvent$.next("calculateWeight");
          this.appleInMachine$.next(apple);
          return apple;
        }),
        delay(1000),
        map((apple: Apple) => {
          apple.calculatePrice();
          this.lastEvent$.next("calculatePrice");
          this.appleInMachine$.next(apple);
          return apple;
        }),
        delay(1000),
        map((apple: Apple) => {
          if (apple.appleType === AppleType.RED) {
            this.redApplesCount$.next((this.redApplesCount$.value) + 1);
          } else {
            this.greenApplesCount$.next((this.greenApplesCount$.value) + 1);
          }
          this.lastEvent$.next("filter apple");
          this.appleInMachine$.next(apple);
          return apple;
        }),
        delay(1000),
        map((apple: Apple) => {
          this.lastEvent$.next("update last apple");
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
