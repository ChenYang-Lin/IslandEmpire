

export default class HUD {
    constructor(scene) {
        this.scene = scene;

        this.initHUD();
    }

    initHUD() {
        let islandEmpire = document.getElementById("island-empire").children[0];
        let hud = document.getElementById("hud");
        

        console.log(window.getComputedStyle(islandEmpire).marginTop)

        hud.style.marginTop = window.getComputedStyle(islandEmpire).marginTop;
        hud.style.marginLeft = window.getComputedStyle(islandEmpire).marginLeft;
        hud.style.width = islandEmpire.clientWidth;
        hud.style.height = islandEmpire.clientHeight;
    }
}