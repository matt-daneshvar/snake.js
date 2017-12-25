import Direction from "./Direction";

export default class Snake {
    constructor() {
        this.canvas = null;
        this.dead = false;
        this.direction = 'left';
        this.color = 'black';
        this.shed = [];
        this.body = [
            {
                x: 0,
                y: 0,
            },
            {
                x: 1,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 1,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 1,
                y: 0,
            }
        ];
    }

    get head() {
        return this.body[0];
    }

    go(direction) {
        if (!Direction.exists(direction) || Direction.isOpposite(direction, this.direction)) {
            return;
        }

        this.direction = direction;
    }

    move(direction) {
        var headPosition = Object.assign({}, this.head);
        switch (direction) {
            case 'left': {
                headPosition.x += 1;
                break;
            }
            case 'right': {
                headPosition.x -= 1;
                break;
            }
            case 'up': {
                headPosition.y -= 1;
                break;
            }
            case 'down': {
                headPosition.y += 1;
                break;
            }
        }

        headPosition = this.canvas.fit(headPosition);

        this.body.unshift(headPosition);

        if (!this.eat(this.canvas.at(this.head))) {
            this.body.pop();
        }

        for (let i in this.body) {
            if (i < 1) {
                continue;
            }

            let position = this.body[i];
            if (position.x === headPosition.x && position.y === headPosition.y) {
                this.shed = this.body.splice(i);
            }
        }

        if (this.isOut()) {
            this.die();
        }
    }

    eat(objects) {
        for (let i in objects) {
            if (objects[i].edible) {
                objects[i].eaten = true;
                return true;
            }
        }

        return false;
    }

    isOut() {
        return !this.canvas.contains(this.head);
    }

    die() {
        this.dead = true;
    }
}