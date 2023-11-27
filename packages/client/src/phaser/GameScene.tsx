import Phaser from 'phaser';
import Enemy  from './enemies/Enemies';
import Turret1 from './turrets/Turret1';
import BulletTurret1 from './turrets/BulletTurret1';
import { map, BULLET_DAMAGE } from '../phaser/constants';

class GameScene extends Phaser.Scene {

    private enemies!: Phaser.Physics.Arcade.Group;
    private turrets!: Phaser.GameObjects.Group;
    private bullets!: Phaser.GameObjects.Group;
    private nextEnemy!: number;
    private path!: Phaser.Curves.Path;
    private map=map;

    constructor(){
        super('GameScene')
    }

    preload(){
        this.load.atlas('sprites', 'assets/spritesheet.png', 'assets/spritesheet.json');    
        this.load.image('bullet', 'assets/bullet.png');
    }

    create() {
        //
        const graphics = this.add.graphics();
        this.drawLines(graphics);

        // the path for our enemies
        // parameters are the start x and y of our path
        this.path = this.add.path(96, -32);
        this.path.lineTo(96, 164);
        this.path.lineTo(480, 164);
        this.path.lineTo(480, 544);

        graphics.lineStyle(3, 0xffffff, 1);
        // visualize the path
        this.path.draw(graphics);

        this.enemies = this.physics.add.group({ classType: Enemy, runChildUpdate: true });
        this.turrets = this.add.group({ classType: Turret1, runChildUpdate: true });
        this.bullets = this.physics.add.group({ classType: BulletTurret1, runChildUpdate: true });

        this.nextEnemy = 0;
        this.physics.add.overlap(this.enemies, this.bullets, this.damageEnemy);
        this.input.on('pointerdown', this.placeTurret, this);
    }
    
    damageEnemy(enemy:Enemy, bullet:BulletTurret1) {  
        // only if both enemy and bullet are alive
        if (enemy.active === true && bullet.active === true) {
            // we remove the bullet right away
            bullet.setActive(false);
            bullet.setVisible(false);    
            
            // decrease the enemy hp with BULLET_DAMAGE
            enemy.receiveDamage(BULLET_DAMAGE);
        }
    }

    drawLines(graphics:Phaser.GameObjects.Graphics) {
        graphics.lineStyle(1, 0x0000ff, 0.8);
        for(let i = 0; i < 8; i++) {
            graphics.moveTo(0, i * 64);
            graphics.lineTo(640, i * 64);
        }
        for(let j = 0; j < 10; j++) {
            graphics.moveTo(j * 64, 0);
            graphics.lineTo(j * 64, 512);
        }
        graphics.strokePath();
    }

    placeTurret(pointer:Phaser.Input.Pointer) {
        const i = Math.floor(pointer.y/64);
        const j = Math.floor(pointer.x/64);
        console.log(i, j);
        console.log(this.map);
        if(this.map[i][j] === 0) {
            const turret = this.turrets.get();
            if (turret)
            {
                turret.setActive(true);
                turret.setVisible(true);
                turret.place(i, j, this.map);
            }   
        }
    }

    canPlaceTurret(i:number, j:number) {
        return this.map[i][j] === 0;
    }

    addBullet(x:number, y:number, angle:number) {
        const bullet = this.bullets.get();
        if (bullet)
        {
            bullet.fire(x, y, angle);
        }
    }

    getEnemy(x:number, y:number, distance:number) {
        const enemyUnits = this.enemies.getChildren();
        for(let i = 0; i < enemyUnits.length; i++) {       
            if(enemyUnits[i].active && Phaser.Math.Distance.Between(
                x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
                return enemyUnits[i];
        }
        return false;
    }

    update(time:number, delta:number) {
        //
        if (time > this.nextEnemy)
        {
            const enemy = this.enemies.get();
            if (enemy)
            {
                enemy.setActive(true);
                enemy.setVisible(true);
                enemy.startOnPath(this.path);

                this.nextEnemy = time + 2000;
            }       
        }
    }

}

export default GameScene;