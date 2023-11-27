import React from 'react';
import { usePhaserGame } from '../hooks/usePhaserGame';
import GameScene from './GameScene';


const Game = () => {

  const gameConfig = {
    type: Phaser.AUTO,
    parent: "towergame",
    backgroundColor: '#34222E',
    render: {
      antialias: false,
    },
    scale:{
        width: 640,
        height: 512,
        //mode:  Phaser.Scale.FIT,
        //autoCenter: Phaser.Scale.Center.CENTER_BOTH,
        // width: '100%',
        // height: '100%',
        //zoom: 1
        
    },
    physics:{
        default: 'arcade',
        arcade:{ gravity: { y: 0 } }
    },
    scene: [GameScene]
}
const game = usePhaserGame(gameConfig);

  return (
    <div id="towergame">game</div>
  )
}

export default Game