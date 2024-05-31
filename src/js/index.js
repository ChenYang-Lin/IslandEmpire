import MainScene from "./MainScene.js";

// PWA
let deferredPrompt; 
window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
});
const installUI = document.getElementById("install-ui");
installUI.addEventListener("click", async () => {
    if (deferredPrompt !== null && deferredPrompt !== undefined) {
        console.log(deferredPrompt)
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
            deferredPrompt = null;
        }
    } else {
        alert("Application Installed")
    }
})

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

