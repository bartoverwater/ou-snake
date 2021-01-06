import { Direction } from './direction';


export class Snake {
	length = 0;
	segment: number[];

	constructor(segment: number[]) {
		this.segment = segment;
	}

    canMove(dir: Direction): boolean {
		return true;
	}

	doMove(dir:Direction) {
		console.log("move");
	}
}

export interface Food {
	x: number;
	y: number;
}

