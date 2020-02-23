export const INIT = 0;
export const NAME_SET = 1;
export const GAME_SET = 2;

export const ERROR = -1;
export const ERROR_STATE = 'ERROR';

export const STATES = [
    'INIT',
    'NAME_SET',
    'GAME_SET'
];

class Rules {
    state: number = INIT;

    constructor() {
        console.log('new rules');
    }

    getState(): string {
        if (this.state <= STATES.length - 1 && this.state >= 0) {
            return STATES[this.state];
        } else {
            return ERROR_STATE;
        }
    }

    setName(): void {
        this.state = NAME_SET;
    }

    setGame(): void {
        this.state = GAME_SET;
    }
}

export default Rules;