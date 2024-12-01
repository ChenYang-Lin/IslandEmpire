import MainScene from "./scene/MainScene.js";
import ConstructionScene from "./scene/ConstructionScene.js";
import HomeScene from "./scene/HomeScene.js";

const config = {
    type: Phaser.AUTO,
    scale: {
        // mode: Phaser.Scale.FIT,
        // autoCenter: Phaser.Scale.CENTER_BOTH,
        // autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    },
    // backgroundColor: "#6ab7d7",
    backgroundColor: "#000000",
    width: window.innerWidth,
    height: window.innerHeight,
    // width: 960,
    // height: 540,
    // width: 1920,
    // height: 1080,
    parent: "island-empire",
    scene: [
        MainScene,
        ConstructionScene,
        HomeScene
    ],
    pixelArt: true,
    // roundPixels: false,
    // fps: {
    //     forceSetTimeOut: true,
    //     target: 60,
    // },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            // debug: true,
            debug: false,
        }
    }
};

const game = new Phaser.Game(config);

