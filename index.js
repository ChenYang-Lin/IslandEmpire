import MainScene from "./MainScene.js";


const config = {
    type: Phaser.AUTO,
    // backgroundColor: "#6ab7d7",
    backgroundColor: "#000000",
    width: 1920,
    height: 1080,
    parent: "skyland",
    scene: MainScene,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        }
    }
};

const game = new Phaser.Game(config);