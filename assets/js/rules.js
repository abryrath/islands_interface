export const INIT = 0;
export const NAME_SET = 1;

export const STATES = {
    0: 'INIT',
    1: 'NAME_SET',
    2: 'IDK'
};
class Rules {
    state = INIT;
    constructor() {
        console.log('new rules');
    }

    getState() {
        return STATES[this.state];
    }

    setName() {
        this.state = NAME_SET;
    }
}

export default Rules;