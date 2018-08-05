import {Component} from '@angular/core';
import {Direction, Robot} from './robot/robot';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  input = '';
  result: string;

  applyInput() {
    this.result = null;
    // TODO extract the parser code to a separate module
    const inputSplit = this.input.trim().split(/\s+/);
    let i = 0;
    for (; i < inputSplit.length; i++) { // ignore all tokens other then PLACE
      if (inputSplit[i] === 'PLACE') {
        break;
      }
    }
    const initialPlace = inputSplit[++i];
    if (!initialPlace) {
      return;
    }
    const initialPlaceSplit = initialPlace.split(/\s*,\s*/);
    const x = Number(initialPlaceSplit[0]);
    const y = Number(initialPlaceSplit[1]);
    const direction: Direction = <Direction>initialPlaceSplit[2];
    const robot = new Robot({x, y}, direction);
    i++;

    for (; i < inputSplit.length; i++) {
      const command = inputSplit[i];
      if (command === 'MOVE') {
        robot.move();
      } else if (command === 'LEFT') {
        robot.rotate('LEFT');
      } else if (command === 'RIGHT') {
        robot.rotate('RIGHT');
      } else {
        throw Error('Unknown command: ' + command);
      }
    }

    this.result = robot.report();
  }
}
