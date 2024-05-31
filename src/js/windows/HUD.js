

export default class HUD {
    constructor(scene) {
        this.scene = scene;

        this.initHUD();
    }

    initHUD() {
        this.windowSizeSynchronization();
        this.setActionButton(0);
        
        this.shopUI = document.getElementById("shop-ui");
        this.shopUI.addEventListener("pointerdown", () => {
            this.scene.shop.openWindow();
        })
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

    setActionButton() {
        let icon = document.getElementById("action-btn-icon");
        let selectedIndex = this.scene.inventory.inventoryWindow.selectedIndex;
        let name = this.scene.inventory.inventoryOrder[selectedIndex];
        if (name) 
            icon.src = this.scene.sys.game.textures.getBase64("item", name);
        else
            icon.src = ""
    }

    createCollectablesContainer(collectables, i) {
        let collectablesContainer = document.getElementById("collectables-container");
        
        collectablesContainer.innerHTML = ""; // refresh container;

        // Create collectables button
        collectables.forEach((collectable, i) => {
            let collectableBtn = document.createElement("button");
            collectableBtn.classList.add("collectable-btn");
            // collectableBtn.setAttribute("index", `${i}`);
            collectableBtn.addEventListener("pointerdown", () => {
                collectableBtn.remove();
                this.scene.inventory.addItem(collectable.collectable, 1);
                this.scene.player.sensors.touchingNearbyCollectables[i].onDeath();
                this.scene.player.collisionController.addCollectableCollected(collectable);
            })

            // Create collectable img
            let collectableImg = document.createElement('img');
            collectableImg.classList.add("collectable-img");
            collectableImg.src = this.scene.sys.game.textures.getBase64("item", collectable.collectable);

            // Create collectable text
            let collectableText = document.createElement("div");
            collectableText.classList.add("collectable-name");
            collectableText.innerHTML = `${collectable.collectable}`;
    
            collectableBtn.appendChild(collectableImg);
            collectableBtn.appendChild(collectableText);
            collectablesContainer.appendChild(collectableBtn);
                    
        })
    }

    update() {
        // this.renderCurrentFPS();
        this.setActionButton();
    }   
}