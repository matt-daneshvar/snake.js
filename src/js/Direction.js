export const Directions = {
    right: 'left',
    left: 'right',
    up: 'down',
    down: 'up'
};

export default class Direction {
    static exists(direction) {
        return typeof Directions[direction] !== 'undefined';
    }

    static random() {
        var keys = Object.keys(Directions)
        return Directions[keys[keys.length * Math.random() << 0]];
    }

    static isOpposite(a, b) {
        return Directions[a] === b;
    }

    toString()
    {
        return this.name;
    }
}

