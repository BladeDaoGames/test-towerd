import Phaser from 'phaser';
//import { map } from '../constants';

export default class BulletTurret1 extends 
    Phaser.GameObjects.Image {

    dy!: number;
    dx!: number;
    lifespan!: number;
    speed!: number;

    constructor(scene: Phaser.Scene, x: number, y: number,
        texture: string, frame: string | number) {
            super(scene, x, y, "bullet");
            this.dy = 0;
            this.dx = 0;
            this.lifespan = 0;

            this.speed = Phaser.Math.GetSpeed(600, 1);
    }

    fire(x:number, y:number, angle:number){
        this.setActive(true);
        this.setVisible(true);
        //  Bullets fire from the middle of the screen to the given x/y
        this.setPosition(x, y);

        this.dy = Math.sin(angle);
        this.dx = Math.cos(angle);
        

        this.lifespan = 1000;
    }

    update(time, delta){
        this.lifespan -= delta;

        this.x += this.dx * (this.speed * delta);
        this.y += this.dy * (this.speed * delta);

        if (this.lifespan <= 0)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }


}