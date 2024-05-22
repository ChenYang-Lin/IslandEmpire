

export default class HUD {
    constructor(scene) {
        this.scene = scene;

        this.initHUD();
    }

    initHUD() {
        this.windowSizeSynchronization();
        
        
    }

    windowSizeSynchronization() {
        // Make sure the size of HUD window is same as game size.
        let islandEmpire = document.getElementById("island-empire").children[0];
        let hud = document.getElementById("hud");
        hud.style.display = "none"

        setTimeout(() => {    
            hud.style.marginTop = window.getComputedStyle(islandEmpire).marginTop;
            hud.style.marginLeft = window.getComputedStyle(islandEmpire).marginLeft;
            hud.style.width = window.getComputedStyle(islandEmpire).width;
            hud.style.height = window.getComputedStyle(islandEmpire).height;
            hud.style.display = "block"
        }, 50);
    }

    renderCurrentFPS() {
        let fps = Math.floor(this.scene.sys.game.loop.actualFps);
        
        let fpsDiv = document.getElementById("fps");
        fpsDiv.innerHTML = `FPS: ${fps}`;
    }

    update() {
        this.renderCurrentFPS();
    }   
}