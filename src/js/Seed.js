export default class Seed
{
    constructor()
    {
        this.edible = true;
        this.eaten = false;
        this.color = 'gray';
        this.body = [
            {
                x: 0,
                y: 0
            }
        ];
    }

    eaten()
    {
        this.eaten = true;
    }
}