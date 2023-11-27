import Phaser from 'phaser';
import { ENEMY_SPEED } from '../constants';

export default class Enemy extends 
    Phaser.GameObjects.Image {

        private follower: { t: number, vec: Phaser.Math.Vector2 };
        hp: number;
        path!: Phaser.Curves.Path;

        constructor(scene: Phaser.Scene, x: number, y: number,
            texture: string, frame: string | number) {
                super(scene, x, y, "sprites", "enemy");

                this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
                this.hp = 0;
                //this.path = path;
            }

        startOnPath(path: Phaser.Curves.Path) {
            this.follower.t = 0;
            this.hp = 100;
            this.path= path;
            this.path.getPoint(this.follower.t, this.follower.vec);
            
            this.setPosition(this.follower.vec.x, this.follower.vec.y);
        }

        receiveDamage(damage: number) {
            this.hp -= damage;           
            
            // if hp drops below 0 we deactivate this enemy
            if(this.hp <= 0) {
                this.setActive(false);
                this.setVisible(false);      
            }
        }

        update(time: number, delta: number) {
            //
            this.follower.t += ENEMY_SPEED * delta;
            this.path.getPoint(this.follower.t, this.follower.vec);
            
            this.setPosition(this.follower.vec.x, this.follower.vec.y);

            if (this.follower.t >= 1)
            {
                this.setActive(false);
                this.setVisible(false);
            }
        }
    }