
import Shop from "./Shop.js";
import Inventory from "./inventory/Inventory.js";

export default class HUD {
    constructor(scene) {
        this.scene = scene;

        this.hud = document.getElementById("hud");
        this.inventorySlotsContainer = document.getElementById("inventory-slots-container");
        this.collectableContainer = document.getElementById("collectables-container");
        this.actionBtn = document.getElementById("action-btn");

        // UIs
        this.shopUI = document.getElementById("shop-ui");
        this.inventoryUI = document.getElementById("inventory-ui");
        this.constructionUI = document.getElementById("construction-ui");
        this.exitUI = document.getElementById("exit-ui");
        this.constructionContainer = document.getElementById("construction-container");
        this.initHUD();
    }

    initHUD() {
        this.inventory = new Inventory(this.scene, this);
        this.shop = new Shop(this.scene, this);

        this.shopUI.addEventListener("pointerdown", () => {
            this.shop.openWindow();
        })

        this.inventoryUI.addEventListener("pointerdown", () => {
            this.inventory.openWindow();
        })
        
        this.constructionUI.addEventListener("pointerdown", () => {
            this.showConstructionSceneUIs();
            this.scene.scene.start("ConstructionScene");
        })
        this.windowSizeSynchronization();
        this.setActionButton();
        this.showMainSceneUIs();
    }


    windowSizeSynchronization() {
        // Make sure the size of HUD window is same as game size.
        let islandEmpire = document.getElementById("island-empire").children[0];
        this.closeHUD();

        setTimeout(() => {    
            hud.style.marginTop = window.getComputedStyle(islandEmpire).marginTop;
            hud.style.marginLeft = window.getComputedStyle(islandEmpire).marginLeft;
            hud.style.width = window.getComputedStyle(islandEmpire).width;
            hud.style.height = window.getComputedStyle(islandEmpire).height;
            this.openHUD();
        }, 50);
    }

    renderCurrentFPS() {
        let fps = Math.floor(this.scene.sys.game.loop.actualFps);
        
        let fpsDiv = document.getElementById("fps");
        fpsDiv.innerHTML = `FPS: ${fps}`;
    }

    setActionButton() {
        let icon = document.getElementById("action-btn-icon");
        let selectedIndex = this.inventory.inventoryWindow.selectedIndex;
        let name = this.inventory.inventoryOrder[selectedIndex];
        if (name) 
            icon.src = this.scene.sys.game.textures.getBase64("item", name);
        else
            icon.src = ""
    }

    createCollectablesContainer(collectables) {
        console.log("calling")
        let collectablesContainer = document.getElementById("collectables-container");
        
        collectablesContainer.innerHTML = ""; // refresh container;

        // Create collectables button
        collectables.forEach((collectable, i) => {
            let collectableBtn = document.createElement("button");
            collectableBtn.classList.add("collectable-btn");
            // collectableBtn.setAttribute("index", `${i}`);
            collectableBtn.addEventListener("pointerdown", () => {
                collectableBtn.remove();
                this.inventory.addItem(collectable.collectable, 1);
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

    hideMainSceneUIs() {
        this.inventorySlotsContainer.style.display = "none";
        this.collectableContainer.style.display = "none";
        this.actionBtn.style.display = "none";
        this.shopUI.style.display = "none";
        this.constructionUI.style.display = "none";
    }

    showMainSceneUIs() {
        this.hideConstructionSceneUIs();
        this.inventorySlotsContainer.style.display = "flex";
        this.collectableContainer.style.display = "block";
        this.actionBtn.style.display = "block";
        this.shopUI.style.display = "block";
        this.constructionUI.style.display = "block";
    }

    showConstructionSceneUIs() {
        this.hideMainSceneUIs();
        this.exitUI.style.display = "block";
        this.constructionContainer.style.display = "block";
    }

    hideConstructionSceneUIs() {
        this.exitUI.style.display = "none";
        this.constructionContainer.style.display = "none";
    }

    closeHUD () {
        this.hud.style.display = "none";
    }

    openHUD() {
        this.hud.style.display = "block";
    }

    update() {
        // this.renderCurrentFPS();
        this.setActionButton();
    }   
}