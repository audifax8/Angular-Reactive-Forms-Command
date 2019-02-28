import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormCommand } from '../../shared/interfaces';
@Injectable()
export class CommandService {

  private commandList: IFormCommand[] = [];

  constructor() {
  }

  public addCommand(command: IFormCommand): void {
    this.commandList = this.commandList.concat(command);
  }

  public executeCommands(form: FormGroup): void {
    this.commandList.forEach(
      (commad) => {
        commad.execute(form);
      }
    );
    this.commandList = [];
  }
}
