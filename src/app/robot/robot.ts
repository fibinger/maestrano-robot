export class Robot {

  constructor(private location: Location, private direction: Direction) {
    if (!(location.x >= 0 && location.x < 5)) {
      throw Error('Invalid x: ' + location.x);
    }
    if (!(location.y >= 0 && location.y < 5)) {
      throw Error('Invalid y: ' + location.y);
    }
    if (directions.indexOf(direction) === -1) {
      throw Error('Invalid direction: ' + direction);
    }
  }

  move() {
    switch (this.direction) {
      case 'NORTH':
        this.location.y = this.moveAxis(this.location.y, 1);
        break;
      case 'SOUTH':
        this.location.y = this.moveAxis(this.location.y, -1);
        break;
      case 'EAST':
        this.location.x = this.moveAxis(this.location.x, 1);
        break;
      case 'WEST':
        this.location.x = this.moveAxis(this.location.x, -1);
        break;
    }
  }

  rotate(rotation: Rotation) {
    let offset: number;
    if (rotation === 'LEFT') {
      offset = -1;
    } else if (rotation === 'RIGHT') {
      offset = 1;
    } else {
      throw Error('Unknown rotation: ' + rotation);
    }
    const currentDirectionIdx = directions.indexOf(this.direction);
    this.direction = directions[(currentDirectionIdx + offset + 4) % 4];
  }

  report() {
    return this.location.x + ',' + this.location.y + ',' + this.direction;
  }

  private moveAxis(currentLocation: number, locationChange: number) {
    let newLocation = currentLocation + locationChange;
    if (newLocation >= 5) {
      newLocation = 4;
    }
    if (newLocation < 0) {
      newLocation = 0;
    }
    return newLocation;
  }
}

const directions: Direction[] = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

export interface Location {
  x: number;
  y: number;
}

export type Direction = 'NORTH' | 'WEST' | 'SOUTH' | 'EAST';

export type Rotation = 'LEFT' | 'RIGHT';
