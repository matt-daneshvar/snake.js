import Direction from './Direction';
import rand from './Support/rand';

export default class Canvas {
    constructor() {
        this.bounded = true;
        this.bounds = {
            x1: 0,
            x2: 20,
            y1: 0,
            y2: 20
        };
        this.objects = [];
    }

    spawn(object, padding = 0) {
        let position = arguments.length === 3 ? {x: arguments[1], y: arguments[2]} : this.random(padding);
        for (let i = 0; i < object.body.length; i++) {
            object.body[i] = {
                x: position.x + i,
                y: position.y
            };
        }

        if (typeof object.direction !== 'undefined') {
            object.direction = Direction.random();
        }

        if (typeof object.dead !== 'undefined') {
            object.dead = false;
        }

        object.canvas = this;
        this.objects.push(object);
    }

    remove(object) {
        for (let i in this.objects) {
            if (Object.is(object, this.objects[i])) {
                delete this.objects[i];
                this.objects.splice(i, 1);
            }
        }
    }

    clear() {
        this.objects = [];
    }

    at(position) {
        let objects = [];
        for (let i in this.objects) {
            let object = this.objects[i];
            for (let j in object.body) {
                let block = object.body[j];

                if (position.x === block.x && position.y === block.y) {
                    objects.push(object);
                }
            }
        }
        return objects;
    }

    contains(position) {
        return position.x >= this.bounds.x1 && position.x < this.bounds.x2 && position.y >= this.bounds.y1 && position.y < this.bounds.y2;
    }

    fit(position) {
        if (!this.bounded) {
            if (position.x <= this.bounds.x1) {
                position.x = this.bounds.x2 + position.x;
            }

            if (position.x >= this.bounds.x2) {
                position.x = position.x - this.bounds.x2;
            }

            if (position.y <= this.bounds.y1) {
                position.y = this.bounds.y2 + position.y;
            }

            if (position.y >= this.bounds.y2) {
                position.y = position.y - this.bounds.y2;
            }
        }

        return position;
    }

    random(padding = 0) {
        return {
            x: rand(this.bounds.x1 + padding, this.bounds.x2 - padding - 1),
            y: rand(this.bounds.y1 + padding, this.bounds.y2 - padding - 1),
        };
    }
}