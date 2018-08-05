import {inject} from '@angular/core/testing';
import {Robot} from './robot';

describe('RobotService', () => {
  let robot: Robot;

  beforeEach(() => {
    robot = new Robot({x: 3, y: 2}, 'EAST');
  });

  it('should be created', inject([], () => {
    expect(robot.report()).toEqual('3,2,EAST');
  }));

  it('should rotate left', inject([], () => {
    robot.rotate('LEFT');
    expect(robot.report()).toEqual('3,2,NORTH');
  }));

  it('should rotate right', inject([], () => {
    robot.rotate('RIGHT');
    expect(robot.report()).toEqual('3,2,SOUTH');
  }));

  it('should move east', inject([], () => {
    robot.move();
    expect(robot.report()).toEqual('4,2,EAST');
  }));

  it('should move north', inject([], () => {
    robot.rotate('LEFT');
    robot.move();
    expect(robot.report()).toEqual('3,3,NORTH');
  }));

  it('should try to fall south', inject([], () => {
    robot.rotate('RIGHT');
    robot.move();
    robot.move();
    robot.move();
    expect(robot.report()).toEqual('3,0,SOUTH');
  }));

  it('should try to fall east', inject([], () => {
    robot.move();
    robot.move();
    expect(robot.report()).toEqual('4,2,EAST');
  }));
});
