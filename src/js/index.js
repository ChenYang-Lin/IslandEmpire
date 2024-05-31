import MainScene from "./MainScene.js";

// // PWA
// let deferredPrompt; 
// window.addEventListener("beforeinstallprompt", (e) => {
//     deferredPrompt = e;
// });
// const installUI = document.getElementById("install-ui");
// installUI.addEventListener("pointerdown", async () => {
//     console.log("deferredPrompt")
//     if (deferredPrompt) {
//         deferredPrompt.prompt();
//         const { outcome } = await deferredPrompt.userChoice;
//         if (outcome === "accepted") {
//             deferredPrompt = null;
//         }
//     }
// })

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        // autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    },
    // backgroundColor: "#6ab7d7",
    backgroundColor: "#000000",
    width: 960,
    height: 540,
    // width: 1920,
    // height: 1080,
    parent: "island-empire",
    scene: MainScene,
    pixelArt: true,
    // fps: {
    //     forceSetTimeOut: true,
    //     target: 60,
    // },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        }
    }
};

const game = new Phaser.Game(config);

