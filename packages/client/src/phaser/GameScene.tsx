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
    }

    update() {
        //
    }

}

export default GameScene;