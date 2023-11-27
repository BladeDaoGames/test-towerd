import Phaser from 'phaser';
//import { map } from '../constants';

export default class Turret1 extends 
    Phaser.GameObjects.Image {

        nextTic: number;

        constructor(scene: Phaser.Scene, x: number, y: number,
            texture: string, frame: string | number) {
                super(scene, x, y, "sprites", "turret");
                this.nextTic = 0;
            }
        
        place(i:number, j:number, map: number[][]) {            
            this.y = i * 64 + 64/2;
            this.x = j * 64 + 64/2;
            map[i][j] = 1;            
        }

        fire() {
            // let enemy = getEnemy(this.x, this.y, 200);
            // if(enemy) {
            //     var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            //     addBullet(this.x, this.y, angle);
            //     this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
            // }
        }

        update(time:number, delta:number)
        {
            if(time > this.nextTic) {
                this.fire();
                this.nextTic = time + 1000;
            }
        }
    }