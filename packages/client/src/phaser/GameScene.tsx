import Phaser from 'phaser';

class GameScene extends Phaser.Scene {

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
        const path = this.add.path(96, -32);
        path.lineTo(96, 164);
        path.lineTo(480, 164);
        path.lineTo(480, 544);

        graphics.lineStyle(3, 0xffffff, 1);
        // visualize the path
        path.draw(graphics);
    }

    update() {
        //
    }

}

export default GameScene;