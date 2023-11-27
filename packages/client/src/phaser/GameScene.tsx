import Phaser from 'phaser';
import Enemy  from './enemies/Enemies';

class GameScene extends Phaser.Scene {

    private enemies!: Phaser.Physics.Arcade.Group;
    private nextEnemy!: number;
    private path!: Phaser.Curves.Path;

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
        this.nextEnemy = 0;
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