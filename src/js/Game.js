import Snake from './Snake';
import Seed from './Seed';
import Canvas from './Canvas';

export default class Game {
    constructor() {
        this.speed = 1;
        this.size = 1;
        this.bounded = true;
        this.interval = null;
        this.playing = false;
        this.over = false;
        this.canvas = new Canvas();
        this.keymap = {
            32: this.toggle.bind(this),
            37: this.go.bind(this, 'right'),
            38: this.go.bind(this, 'up'),
            39: this.go.bind(this, 'left'),
            40: this.go.bind(this, 'down'),
        };
        this.bind();
    }

    bind() {
        document.onkeydown = (function (event) {
            this.keymap[event.keyCode] ? this.keymap[event.keyCode]() : null;
        }).bind(this);
    }

    go(direction) {
        this.playing ? this.snake.go(direction) : null;
    }

    start() {
        this.snake = new Snake();
        this.canvas.spawn(this.snake, 5);
        this.canvas.spawn(new Seed());
        this.play();
    }

    end() {
        this.over = true;
        this.pause();
    }

    restart() {
        this.canvas.clear();
        this.pause();
        this.over = false;
        this.start();
    }

    pause() {
        clearInterval(this.interval);
        this.playing = false;
        this.render();
    }

    play() {
        if (this.over) {
            this.restart();
            return;
        }
        this.interval = setInterval(this.step.bind(this), 100 / this.speed);
        this.playing = true;
    }

    toggle() {
        this.playing ? this.pause() : this.play();
    }

    step() {
        if (this.snake.dead) {
            this.end();
            return;
        }

        var ediblesCount = 0;
        for (let object of this.canvas.objects) {
            if (object.edible) {
                ediblesCount++;
                if (object.eaten) {
                    this.canvas.remove(object);
                }
            }
        }
        ediblesCount < 1 ? this.canvas.spawn(new Seed()) : null;


        for (let position of this.snake.shed) {
            this.canvas.spawn(new Seed(), position.x, position.y);
        }
        this.snake.shed = [];

        this.snake.move(this.snake.direction);
        this.render();
    }

    render() {
        let $ = require('jquery');
        let $canvas = $('#canvas');
        $canvas.attr('class', '');
        $canvas.addClass(this.playing ? 'playing' : 'paused')
            .addClass(this.over ? 'over' : '');
        $canvas.html('');
        for (let i in this.canvas.objects) {
            let object = this.canvas.objects[i];
            for (let j in object.body) {
                let position = object.body[j];
                let $block = $('<div class="block"></div>');
                $block.css({
                    left: position.x * 5 + '%',
                    top: position.y * 5 + '%',
                    background: object.color ? object.color : 'black'
                });
                $canvas.append($block);
            }
        }
    }
}