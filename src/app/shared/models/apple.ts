import { AppleType } from "../enums";

export class Apple {
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